import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { aiConversations, aiMessages, savedLessonExpansions } from "../../drizzle/schema";
import { getModule, getQuestion } from "../content";
import { getDb } from "../db";
import { invokeLLM } from "../_core/llm";
import { protectedProcedure, router } from "../_core/trpc";

const messageSchema = z.object({ role: z.enum(["user", "assistant"]), content: z.string() });
const savedExpansionSchema = z.object({
  moduleId: z.string().min(1).max(120),
  focus: z.string().min(1).max(240),
  title: z.string().min(1).max(240),
  explanation: z.string().min(1).max(12000),
  workedExample: z.string().min(1).max(6000),
  selfCheck: z.string().min(1).max(4000),
  answerGuide: z.string().min(1).max(4000),
});

export const aiRouter = router({
  conversations: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
    return db.select().from(aiConversations).where(eq(aiConversations.userId, ctx.user.id)).orderBy(aiConversations.updatedAt);
  }),

  messages: protectedProcedure.input(z.object({ conversationId: z.number().int().positive() })).query(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
    const conversation = await db.select().from(aiConversations).where(and(eq(aiConversations.id, input.conversationId), eq(aiConversations.userId, ctx.user.id))).limit(1);
    if (!conversation[0]) throw new TRPCError({ code: "FORBIDDEN", message: "Esta conversa não está disponível." });
    return db.select().from(aiMessages).where(eq(aiMessages.conversationId, input.conversationId)).orderBy(aiMessages.createdAt);
  }),

  savedLessonExpansions: protectedProcedure.input(z.object({ moduleId: z.string().min(1).max(120) })).query(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
    return db.select().from(savedLessonExpansions).where(and(eq(savedLessonExpansions.userId, ctx.user.id), eq(savedLessonExpansions.moduleId, input.moduleId))).orderBy(desc(savedLessonExpansions.createdAt));
  }),

  saveLessonExpansion: protectedProcedure.input(savedExpansionSchema).mutation(async ({ ctx, input }) => {
    if (!getModule(input.moduleId)) throw new TRPCError({ code: "NOT_FOUND", message: "Módulo não encontrado." });
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
    const result = await db.insert(savedLessonExpansions).values({ userId: ctx.user.id, ...input });
    const id = Number((result as unknown as [{ insertId: number }])[0].insertId);
    return { id };
  }),

  lessonExpansion: protectedProcedure.input(z.object({ moduleId: z.string().min(1), topic: z.string().max(180).optional() })).mutation(async ({ input }) => {
    const module = getModule(input.moduleId);
    if (!module) throw new TRPCError({ code: "NOT_FOUND", message: "Módulo não encontrado." });
    const focus = input.topic && module.officialTopics.includes(input.topic) ? input.topic : module.officialTopics[0] ?? module.title;
    const response = await invokeLLM({
      model: "gpt-5-mini",
      maxTokens: 1200,
      messages: [
        { role: "system", content: "Você cria aprofundamentos didáticos em português claro para o LUANDA PREP. Use exclusivamente as informações curriculares fornecidas. Não invente fórmulas, datas, instituições ou regras. Se o currículo não fornecer detalhe suficiente para um exemplo numérico ou factual, explique o método sem inventar valores. Não prometa aprovação, nem apresente a explicação como material oficial. Produza JSON válido." },
        { role: "user", content: `Disciplina: ${module.discipline}\nMódulo: ${module.title}\nTópicos oficiais: ${module.officialTopics.join("; ")}\nExplicação base: ${module.lesson.explanation}\nPassos de estudo: ${module.lesson.steps.join(" | ")}\nExemplo existente: ${module.lesson.examples?.[0]?.walkthrough ?? "não disponível"}\nFoco solicitado: ${focus}` },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "lesson_expansion",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              explanation: { type: "string" },
              workedExample: { type: "string" },
              selfCheck: { type: "string" },
              answerGuide: { type: "string" },
            },
            required: ["title", "explanation", "workedExample", "selfCheck", "answerGuide"],
            additionalProperties: false,
          },
        },
      },
    });
    const raw = response.choices[0]?.message?.content;
    const text = typeof raw === "string" ? raw : Array.isArray(raw) ? raw.filter((part): part is { type: "text"; text: string } => part.type === "text").map((part) => part.text).join("\n") : "";
    try {
      const guide = JSON.parse(text);
      return { ...guide, focus, notice: "Aprofundamento gerado pelo LUANDA AI a partir do conteúdo curricular do módulo; confirme sempre com a aula e o programa oficial." };
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Não foi possível gerar o aprofundamento agora. Tente novamente." });
    }
  }),

  chat: protectedProcedure.input(z.object({ message: z.string().min(2).max(4000), conversationId: z.number().int().positive().optional(), moduleId: z.string().optional(), questionId: z.string().optional(), mode: z.enum(["explain", "simple", "example", "steps", "analogy", "exercise", "quiz", "exam"]).default("explain") })).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível. Tente novamente." });
    let conversationId = input.conversationId;
    if (conversationId) {
      const owned = await db.select().from(aiConversations).where(and(eq(aiConversations.id, conversationId), eq(aiConversations.userId, ctx.user.id))).limit(1);
      if (!owned[0]) throw new TRPCError({ code: "FORBIDDEN", message: "Esta conversa não está disponível." });
    } else {
      const result = await db.insert(aiConversations).values({ userId: ctx.user.id, title: input.message.slice(0, 80), context: { moduleId: input.moduleId, questionId: input.questionId } });
      conversationId = Number((result as unknown as [{ insertId: number }])[0].insertId);
    }
    const question = input.questionId ? getQuestion(input.questionId) : undefined;
    const module = input.moduleId ? getModule(input.moduleId) : question ? getModule(question.moduleId) : undefined;
    const history = await db.select().from(aiMessages).where(eq(aiMessages.conversationId, conversationId)).orderBy(aiMessages.createdAt).limit(8);
    const context = [module ? `Módulo actual: ${module.discipline} — ${module.title}. Tópicos oficiais: ${module.officialTopics.join("; ")}.` : "", question ? `Questão de treino actual: ${question.prompt}. O estudante não deve receber a alternativa certa imediatamente; conduza-o por perguntas antes de revelar a solução.` : ""].filter(Boolean).join("\n");
    const systemPrompt = `Você é o LUANDA AI, tutor de um preparatório gratuito e independente para o exame de acesso de Engenharia Informática. O projecto foi elaborado por Delvis de Morais, da Morásio Digital. Ensine em português claro, apropriado a estudantes angolanos. Use um tom paciente e socrático: em vez de entregar a solução imediatamente, pergunte qual seria o primeiro passo, dê pistas progressivas e só apresente a solução completa se o estudante pedir ou continuar bloqueado. O conteúdo oficial do programa é limitado aos tópicos fornecidos pelo produto; deixe explícito quando estiver a dar conteúdo complementar. Nunca afirme que uma questão de treino é oficial, que certamente cairá no exame ou que há garantia de aprovação. Para pedidos de exercício, crie explicitamente “Questão de treino” com resposta e explicação separadas. Não use pesquisa na web.\n${context}`;
    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...history.map((item) => ({ role: item.role as "user" | "assistant", content: item.content })),
      { role: "user" as const, content: `[Modo: ${input.mode}] ${input.message}` },
    ];
    await db.insert(aiMessages).values({ conversationId, role: "user", content: input.message });
    const response = await invokeLLM({ model: "gpt-5-mini", messages, maxTokens: 1100 });
    const rawContent = response.choices[0]?.message?.content;
    const content = typeof rawContent === "string"
      ? rawContent.trim()
      : Array.isArray(rawContent)
        ? rawContent.filter((part): part is { type: "text"; text: string } => part.type === "text").map((part) => part.text).join("\n").trim()
        : "";
    if (!content) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "O LUANDA AI não conseguiu responder agora. Tente novamente." });
    await db.insert(aiMessages).values({ conversationId, role: "assistant", content });
    await db.update(aiConversations).set({ updatedAt: new Date() }).where(eq(aiConversations.id, conversationId));
    return { conversationId, message: { role: "assistant" as const, content } };
  }),
});
