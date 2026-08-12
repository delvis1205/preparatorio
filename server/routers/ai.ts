import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { aiConversations, aiMessages } from "../../drizzle/schema";
import { getModule, getQuestion } from "../content";
import { getDb } from "../db";
import { invokeLLM } from "../_core/llm";
import { protectedProcedure, router } from "../_core/trpc";

const messageSchema = z.object({ role: z.enum(["user", "assistant"]), content: z.string() });

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
    const module = input.moduleId ? getModule(input.moduleId) : undefined;
    const question = input.questionId ? getQuestion(input.questionId) : undefined;
    const history = await db.select().from(aiMessages).where(eq(aiMessages.conversationId, conversationId)).orderBy(aiMessages.createdAt).limit(8);
    const context = [module ? `Módulo actual: ${module.discipline} — ${module.title}. Tópicos oficiais: ${module.officialTopics.join("; ")}.` : "", question ? `Questão de treino actual: ${question.prompt}. O estudante não deve receber a alternativa certa imediatamente; conduza-o por perguntas antes de revelar a solução.` : ""].filter(Boolean).join("\n");
    const systemPrompt = `Você é o LUANDA AI, tutor de uma plataforma independente de preparação para o exame de admissão em Informática de Gestão. Ensine em português claro, apropriado a estudantes angolanos. Use um tom paciente e socrático: em vez de entregar a solução imediatamente, pergunte qual seria o primeiro passo, dê pistas progressivas e só apresente a solução completa se o estudante pedir ou continuar bloqueado. O conteúdo oficial do programa é limitado aos tópicos fornecidos pelo produto; deixe explícito quando estiver a dar conteúdo complementar. Nunca afirme que uma questão de treino é oficial, que certamente cairá no exame ou que há garantia de aprovação. Para pedidos de exercício, crie explicitamente “Questão de treino” com resposta e explicação separadas. Não use pesquisa na web.\n${context}`;
    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...history.map((item) => ({ role: item.role as "user" | "assistant", content: item.content })),
      { role: "user" as const, content: `[Modo: ${input.mode}] ${input.message}` },
    ];
    await db.insert(aiMessages).values({ conversationId, role: "user", content: input.message });
    const response = await invokeLLM({ model: "gpt-5-mini", messages, maxTokens: 1100 });
    const content = response.choices[0]?.message?.content;
    if (!content || typeof content !== "string") throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "O LUANDA AI não conseguiu responder agora. Tente novamente." });
    await db.insert(aiMessages).values({ conversationId, role: "assistant", content });
    await db.update(aiConversations).set({ updatedAt: new Date() }).where(eq(aiConversations.id, conversationId));
    return { conversationId, message: { role: "assistant" as const, content } };
  }),
});
