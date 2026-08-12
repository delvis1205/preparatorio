import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { favorites, moduleProgress, notes, questionAttempts, simulationAttempts, studentProfiles, studyPlans } from "../../drizzle/schema";
import { CURRICULUM, getModule, getQuestion, TRAINING_QUESTIONS, type TrainingQuestion, withoutAnswers } from "../content";
import { getDb } from "../db";
import { isWeeklyStudyPlan, luandaDateKey, selectDailyQuestion, type StudyPlanTask } from "../learningCycle";
import { calculateMastery, masteryLabel } from "../mastery";
import { protectedProcedure, router } from "../_core/trpc";

const statusSchema = z.enum(["not_started", "in_progress", "completed", "review"]);
const difficultySchema = z.enum(["Inicial", "Intermédio", "Avançado"]);

function sortQuestions(questionIds: string[], count: number) {
  const seed = questionIds.join("").split("").reduce((total, character) => total + character.charCodeAt(0), 0);
  return [...TRAINING_QUESTIONS].sort((a, b) => ((a.id.charCodeAt(2) + seed) % 7) - ((b.id.charCodeAt(2) + seed) % 7)).slice(0, Math.max(1, Math.min(count, TRAINING_QUESTIONS.length)));
}

function buildWeeklyTasks(dailyMinutes: number, progressRows: { moduleId: string; mastery: number }[]): StudyPlanTask[] {
  const weakest = CURRICULUM.map((module) => ({ module, mastery: progressRows.find((item) => item.moduleId === module.id)?.mastery ?? 0 })).sort((a, b) => a.mastery - b.mastery);
  const first = weakest[0]?.module ?? CURRICULUM[0];
  const second = weakest[1]?.module ?? CURRICULUM[1];
  const third = weakest[2]?.module ?? CURRICULUM[2];
  return [
    { id: "week-1", label: `Dia 1 · Aprender: ${first.discipline} — ${first.title}`, minutes: Math.round(dailyMinutes * 0.6), done: false, moduleId: first.id },
    { id: "week-2", label: "Dia 2 · Desafio inicial: consolidar fundamentos", minutes: Math.max(15, Math.round(dailyMinutes * 0.45)), done: false, moduleId: first.id },
    { id: "week-3", label: `Dia 3 · Aplicar: ${second.discipline} — ${second.title}`, minutes: Math.round(dailyMinutes * 0.6), done: false, moduleId: second.id },
    { id: "week-4", label: "Dia 4 · Recuperar erros e refazer questões", minutes: Math.max(15, Math.round(dailyMinutes * 0.45)), done: false, moduleId: first.id },
    { id: "week-5", label: `Dia 5 · Consolidar: ${third.discipline} — ${third.title}`, minutes: Math.round(dailyMinutes * 0.6), done: false, moduleId: third.id },
    { id: "week-6", label: "Fecho semanal · Quiz rápido ou simulado curto", minutes: Math.max(20, Math.round(dailyMinutes * 0.7)), done: false },
  ];
}

export const learningRouter = router({
  catalog: protectedProcedure.query(() => ({
    disciplines: ["Matemática", "Língua Portuguesa", "Cultura Geral"],
    modules: CURRICULUM.map((module) => ({ ...module, exerciseCount: TRAINING_QUESTIONS.filter((question) => question.moduleId === module.id).length })),
    totalTrainingQuestions: TRAINING_QUESTIONS.length,
  })),

  lesson: protectedProcedure.input(z.object({ moduleId: z.string().min(1) })).query(({ input }) => {
    const module = getModule(input.moduleId);
    if (!module) throw new TRPCError({ code: "NOT_FOUND", message: "Módulo não encontrado." });
    return module;
  }),

  dashboard: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível. Tente novamente." });
    const [profileRows, progressRows, attemptRows, simulationRows] = await Promise.all([
      db.select().from(studentProfiles).where(eq(studentProfiles.userId, ctx.user.id)).limit(1),
      db.select().from(moduleProgress).where(eq(moduleProgress.userId, ctx.user.id)),
      db.select().from(questionAttempts).where(eq(questionAttempts.userId, ctx.user.id)),
      db.select().from(simulationAttempts).where(eq(simulationAttempts.userId, ctx.user.id)).orderBy(desc(simulationAttempts.completedAt)),
    ]);
    const completed = progressRows.filter((item) => item.status === "completed").length;
    const correct = attemptRows.filter((item) => item.isCorrect).length;
    const accuracy = attemptRows.length ? Math.round((correct / attemptRows.length) * 100) : 0;
    const masteryRows = CURRICULUM.map((module) => {
      const saved = progressRows.find((item) => item.moduleId === module.id);
      return { module, mastery: saved?.mastery ?? 0, status: saved?.status ?? "not_started", completionPercent: saved?.completionPercent ?? 0 };
    });
    const next = masteryRows.sort((a, b) => a.mastery - b.mastery)[0];
    const byDiscipline = ["matematica", "fisica", "quimica", "geometria", "portugues", "cultura"].map((disciplineId) => {
      const entries = masteryRows.filter((item) => item.module.disciplineId === disciplineId);
      const average = entries.length ? Math.round(entries.reduce((sum, item) => sum + item.mastery, 0) / entries.length) : 0;
      return { id: disciplineId, label: entries[0]?.module.discipline ?? disciplineId, mastery: average };
    });
    const preparationIndex = masteryRows.length ? Math.round(masteryRows.reduce((sum, item) => sum + item.mastery, 0) / masteryRows.length) : 0;
    return {
      profile: profileRows[0] ?? null,
      stats: { completed, totalModules: CURRICULUM.length, answered: attemptRows.length, accuracy, simulations: simulationRows.length, preparationIndex },
      next: next ? { moduleId: next.module.id, title: next.module.title, discipline: next.module.discipline, mastery: next.mastery, reason: next.mastery === 0 ? "Comece por este módulo para activar a sua preparação." : "Este é o ponto com maior potencial de melhoria agora." } : null,
      byDiscipline,
      recentSimulation: simulationRows[0] ?? null,
      moduleProgress: masteryRows,
    };
  }),

  profile: router({
    save: protectedProcedure.input(z.object({ displayName: z.string().min(2).max(80), examDate: z.string().optional(), dailyMinutes: z.number().int().min(10).max(360), studyDays: z.array(z.string()).max(7), goal: z.string().max(240).optional(), theme: z.enum(["light", "dark", "system"]).default("system") })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      await db.insert(studentProfiles).values({ userId: ctx.user.id, displayName: input.displayName, examDate: input.examDate || null, dailyMinutes: input.dailyMinutes, studyDays: input.studyDays, goal: input.goal || null, theme: input.theme }).onDuplicateKeyUpdate({ set: { displayName: input.displayName, examDate: input.examDate || null, dailyMinutes: input.dailyMinutes, studyDays: input.studyDays, goal: input.goal || null, theme: input.theme } });
      return { success: true };
    }),
  }),

  resources: router({
    favorites: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      return db.select().from(favorites).where(eq(favorites.userId, ctx.user.id));
    }),
    toggleFavorite: protectedProcedure.input(z.object({ resourceType: z.enum(["module", "question", "lesson"]), resourceId: z.string().min(1).max(120) })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      const existing = await db.select().from(favorites).where(and(eq(favorites.userId, ctx.user.id), eq(favorites.resourceType, input.resourceType), eq(favorites.resourceId, input.resourceId))).limit(1);
      if (existing[0]) {
        await db.delete(favorites).where(eq(favorites.id, existing[0].id));
        return { favorited: false };
      }
      await db.insert(favorites).values({ userId: ctx.user.id, resourceType: input.resourceType, resourceId: input.resourceId });
      return { favorited: true };
    }),
    notes: protectedProcedure.input(z.object({ moduleId: z.string().optional() }).optional()).query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      return input?.moduleId ? db.select().from(notes).where(and(eq(notes.userId, ctx.user.id), eq(notes.moduleId, input.moduleId))).orderBy(desc(notes.updatedAt)) : db.select().from(notes).where(eq(notes.userId, ctx.user.id)).orderBy(desc(notes.updatedAt));
    }),
    saveNote: protectedProcedure.input(z.object({ noteId: z.number().int().positive().optional(), moduleId: z.string().optional(), body: z.string().min(1).max(8000) })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      if (input.noteId) {
        const current = await db.select().from(notes).where(and(eq(notes.id, input.noteId), eq(notes.userId, ctx.user.id))).limit(1);
        if (!current[0]) throw new TRPCError({ code: "FORBIDDEN", message: "Esta anotação não está disponível." });
        await db.update(notes).set({ body: input.body, moduleId: input.moduleId ?? null }).where(eq(notes.id, input.noteId));
        return { id: input.noteId };
      }
      const result = await db.insert(notes).values({ userId: ctx.user.id, moduleId: input.moduleId ?? null, body: input.body });
      return { id: Number((result as unknown as [{ insertId: number }])[0].insertId) };
    }),
  }),

  plan: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      const saved = await db.select().from(studyPlans).where(eq(studyPlans.userId, ctx.user.id)).limit(1);
      const [profileRows, progressRows] = await Promise.all([
        db.select().from(studentProfiles).where(eq(studentProfiles.userId, ctx.user.id)).limit(1),
        db.select().from(moduleProgress).where(eq(moduleProgress.userId, ctx.user.id)),
      ]);
      const dailyMinutes = saved[0]?.dailyMinutes ?? profileRows[0]?.dailyMinutes ?? 45;
      const nextPlan = { title: "Ciclo semanal de preparação", dailyMinutes, tasks: buildWeeklyTasks(dailyMinutes, progressRows) };
      if (saved[0] && isWeeklyStudyPlan(saved[0].tasks)) return saved[0];
      if (saved[0]) {
        await db.update(studyPlans).set(nextPlan).where(eq(studyPlans.id, saved[0].id));
        return { ...saved[0], ...nextPlan };
      }
      return { id: 0, ...nextPlan };
    }),
    save: protectedProcedure.input(z.object({ title: z.string().min(3).max(120), dailyMinutes: z.number().int().min(10).max(360), tasks: z.array(z.object({ id: z.string().min(1), label: z.string().min(1).max(180), minutes: z.number().int().min(5).max(360), done: z.boolean(), moduleId: z.string().optional() })).min(1).max(21) })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      await db.insert(studyPlans).values({ userId: ctx.user.id, title: input.title, dailyMinutes: input.dailyMinutes, tasks: input.tasks }).onDuplicateKeyUpdate({ set: { title: input.title, dailyMinutes: input.dailyMinutes, tasks: input.tasks } });
      return { success: true };
    }),
    reset: protectedProcedure.mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      const [profileRows, progressRows, saved] = await Promise.all([
        db.select().from(studentProfiles).where(eq(studentProfiles.userId, ctx.user.id)).limit(1),
        db.select().from(moduleProgress).where(eq(moduleProgress.userId, ctx.user.id)),
        db.select().from(studyPlans).where(eq(studyPlans.userId, ctx.user.id)).limit(1),
      ]);
      const dailyMinutes = saved[0]?.dailyMinutes ?? profileRows[0]?.dailyMinutes ?? 45;
      const nextPlan = { title: "Ciclo semanal de preparação", dailyMinutes, tasks: buildWeeklyTasks(dailyMinutes, progressRows) };
      await db.insert(studyPlans).values({ userId: ctx.user.id, ...nextPlan }).onDuplicateKeyUpdate({ set: nextPlan });
      return { success: true };
    }),
  }),

  progress: router({
    update: protectedProcedure.input(z.object({ moduleId: z.string(), status: statusSchema, completionPercent: z.number().min(0).max(100), currentLessonId: z.string().optional() })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      const module = getModule(input.moduleId);
      if (!module) throw new TRPCError({ code: "NOT_FOUND", message: "Módulo não encontrado." });
      const attempts = await db.select().from(questionAttempts).where(and(eq(questionAttempts.userId, ctx.user.id), eq(questionAttempts.moduleId, input.moduleId)));
      const mastery = calculateMastery({ attempts: attempts.length, correct: attempts.filter((attempt) => attempt.isCorrect).length, completionPercent: input.completionPercent, daysSinceLastStudy: 0 });
      await db.insert(moduleProgress).values({ userId: ctx.user.id, moduleId: input.moduleId, status: input.status, completionPercent: input.completionPercent, mastery, currentLessonId: input.currentLessonId ?? module.lesson.id, lastAccessedAt: new Date() }).onDuplicateKeyUpdate({ set: { status: input.status, completionPercent: input.completionPercent, mastery, currentLessonId: input.currentLessonId ?? module.lesson.id, lastAccessedAt: new Date() } });
      return { success: true, mastery, label: masteryLabel(mastery) };
    }),
  }),

  questions: router({
    list: protectedProcedure.input(z.object({ questionId: z.string().optional(), disciplineId: z.enum(["matematica", "fisica", "quimica", "geometria", "portugues", "cultura"]).optional(), moduleId: z.string().optional(), difficulty: difficultySchema.optional(), onlyIncorrect: z.boolean().optional(), onlyUnanswered: z.boolean().optional(), favoritesOnly: z.boolean().optional() }).optional()).query(async ({ ctx, input }) => {
      const filters = input ?? {};
      let questions = TRAINING_QUESTIONS.filter((question) => (!filters.questionId || question.id === filters.questionId) && (!filters.disciplineId || question.disciplineId === filters.disciplineId) && (!filters.moduleId || question.moduleId === filters.moduleId) && (!filters.difficulty || question.difficulty === filters.difficulty));
      const db = await getDb();
      if (db && (filters.onlyIncorrect || filters.onlyUnanswered || filters.favoritesOnly)) {
        const attempts = await db.select().from(questionAttempts).where(eq(questionAttempts.userId, ctx.user.id));
        if (filters.onlyIncorrect) questions = questions.filter((question) => attempts.some((attempt) => attempt.questionId === question.id && !attempt.isCorrect));
        if (filters.onlyUnanswered) questions = questions.filter((question) => !attempts.some((attempt) => attempt.questionId === question.id));
      }
      return questions.map(withoutAnswers);
    }),
    submit: protectedProcedure.input(z.object({ questionId: z.string(), selectedOption: z.number().int().min(0), durationSeconds: z.number().int().min(0).max(3600).default(0) })).mutation(async ({ ctx, input }) => {
      const question = getQuestion(input.questionId);
      if (!question) throw new TRPCError({ code: "NOT_FOUND", message: "Questão de treino não encontrada." });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Não foi possível guardar a sua resposta. Tente novamente." });
      const isCorrect = input.selectedOption === question.correctOption;
      await db.insert(questionAttempts).values({ userId: ctx.user.id, questionId: question.id, moduleId: question.moduleId, topic: question.topic, selectedOption: input.selectedOption, isCorrect, durationSeconds: input.durationSeconds });
      const attempts = await db.select().from(questionAttempts).where(and(eq(questionAttempts.userId, ctx.user.id), eq(questionAttempts.moduleId, question.moduleId)));
      const current = (await db.select().from(moduleProgress).where(and(eq(moduleProgress.userId, ctx.user.id), eq(moduleProgress.moduleId, question.moduleId))).limit(1))[0];
      const mastery = calculateMastery({ attempts: attempts.length, correct: attempts.filter((attempt) => attempt.isCorrect).length, completionPercent: current?.completionPercent ?? 0, daysSinceLastStudy: 0 });
      await db.insert(moduleProgress).values({ userId: ctx.user.id, moduleId: question.moduleId, status: "in_progress", completionPercent: current?.completionPercent ?? 0, mastery, currentLessonId: current?.currentLessonId ?? getModule(question.moduleId)?.lesson.id, lastAccessedAt: new Date() }).onDuplicateKeyUpdate({ set: { mastery, status: "in_progress", lastAccessedAt: new Date() } });
      return { isCorrect, correctOption: question.correctOption, explanation: question.explanation, errorHint: question.errorHint, mastery, masteryLabel: masteryLabel(mastery), recommendation: isCorrect ? "Excelente. Continue para uma questão de dificuldade semelhante ou avance no módulo." : `Reveja “${question.topic}” e tente outra questão de treino antes de aumentar a dificuldade.` };
    }),
  }),

  review: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
    const attempts = await db.select().from(questionAttempts).where(and(eq(questionAttempts.userId, ctx.user.id), eq(questionAttempts.isCorrect, false))).orderBy(desc(questionAttempts.createdAt));
    return attempts.map((attempt) => ({ attempt, question: getQuestion(attempt.questionId) ? withoutAnswers(getQuestion(attempt.questionId)!) : null })).filter((item) => item.question);
  }),

  challenges: router({
    today: protectedProcedure.input(z.object({ disciplineId: z.enum(["matematica", "fisica", "quimica", "geometria", "portugues", "cultura"]).optional() }).optional()).query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      const [profileRows, progressRows, attempts, planRows] = await Promise.all([
        db.select().from(studentProfiles).where(eq(studentProfiles.userId, ctx.user.id)).limit(1),
        db.select().from(moduleProgress).where(eq(moduleProgress.userId, ctx.user.id)),
        db.select().from(questionAttempts).where(eq(questionAttempts.userId, ctx.user.id)),
        db.select().from(studyPlans).where(eq(studyPlans.userId, ctx.user.id)).limit(1),
      ]);
      const selectedQuestions = input?.disciplineId ? TRAINING_QUESTIONS.filter((question) => question.disciplineId === input.disciplineId) : TRAINING_QUESTIONS;
      const levels = (["Inicial", "Intermédio", "Avançado"] as const).map((difficulty) => ({
        difficulty,
        title: difficulty === "Inicial" ? "Fundamentos firmes" : difficulty === "Intermédio" ? "Aplicação consciente" : "Raciocínio de exame",
        description: difficulty === "Inicial" ? "Reforce definições, métodos e confiança antes de aumentar o ritmo." : difficulty === "Intermédio" ? "Combine conceitos e escolha o método certo em problemas novos." : "Trabalhe questões que exigem mais etapas, verificação e tempo controlado.",
        available: selectedQuestions.filter((question) => question.difficulty === difficulty).length,
      }));
      const eligibleModules = input?.disciplineId ? CURRICULUM.filter((module) => module.disciplineId === input.disciplineId) : CURRICULUM;
      const mastery = eligibleModules.map((module) => ({ module, value: progressRows.find((item) => item.moduleId === module.id)?.mastery ?? 0 }));
      const weak = mastery.sort((a, b) => a.value - b.value)[0];
      const selectedModuleIds = new Set(eligibleModules.map((module) => module.id));
      const wrong = attempts.filter((attempt) => !attempt.isCorrect && selectedModuleIds.has(attempt.moduleId));
      const recoveryModule = wrong.length ? wrong[0]?.moduleId : weak?.module.id;
      const dateKey = luandaDateKey();
      const dailyQuestion = selectDailyQuestion(ctx.user.id, dateKey, TRAINING_QUESTIONS);
      const dailyComplete = Boolean(dailyQuestion && planRows[0]?.lastChallengeDate === dateKey && planRows[0]?.lastChallengeQuestionId === dailyQuestion.id && planRows[0]?.lastChallengeCompletedAt);
      return {
        weeklyTarget: Math.max(3, profileRows[0]?.studyDays?.length ?? 5),
        levels,
        daily: dailyQuestion ? { dateKey, questionId: dailyQuestion.id, topic: dailyQuestion.topic, prompt: dailyQuestion.prompt, discipline: CURRICULUM.find((module) => module.id === dailyQuestion.moduleId)?.discipline ?? "Preparação", difficulty: dailyQuestion.difficulty, completed: dailyComplete } : null,
        recovery: {
          moduleId: recoveryModule,
          title: wrong.length ? "Recupere um erro recente" : `Construa base em ${weak?.module.title ?? "um módulo"}`,
          description: wrong.length ? "Uma sessão curta com questões do módulo em que houve erro recente reforça a memória e reduz a repetição do mesmo padrão." : "O plano identificou um módulo com domínio baixo. Comece por ele, faça a aula e avance para uma prática curta.",
        },
      };
    }),
    completeDaily: protectedProcedure.input(z.object({ questionId: z.string().min(1).max(120) })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A base de dados não está disponível." });
      const dateKey = luandaDateKey();
      const expected = selectDailyQuestion(ctx.user.id, dateKey, TRAINING_QUESTIONS);
      if (!expected || expected.id !== input.questionId) throw new TRPCError({ code: "BAD_REQUEST", message: "Esta questão não corresponde ao desafio de hoje." });
      const saved = await db.select().from(studyPlans).where(eq(studyPlans.userId, ctx.user.id)).limit(1);
      const state = { lastChallengeDate: dateKey, lastChallengeQuestionId: expected.id, lastChallengeCompletedAt: new Date() };
      if (saved[0]) await db.update(studyPlans).set(state).where(eq(studyPlans.id, saved[0].id));
      else await db.insert(studyPlans).values({ userId: ctx.user.id, title: "Ciclo semanal de preparação", dailyMinutes: 45, tasks: [], ...state });
      return { success: true, dateKey };
    }),
  }),

  simulation: router({
    start: protectedProcedure.input(z.object({ count: z.number().int().min(3).max(20), disciplineId: z.enum(["matematica", "fisica", "quimica", "geometria", "portugues", "cultura"]).optional() })).query(({ input }) => {
      const candidates = input.disciplineId ? TRAINING_QUESTIONS.filter((question) => question.disciplineId === input.disciplineId) : TRAINING_QUESTIONS;
      return sortQuestions(candidates.map((question) => question.id), Math.min(input.count, candidates.length)).map(withoutAnswers);
    }),
    submit: protectedProcedure.input(z.object({ answers: z.array(z.object({ questionId: z.string(), selectedOption: z.number().int().min(0) })), durationSeconds: z.number().int().min(0).max(14400), mode: z.enum(["practice", "exam"]) })).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Não foi possível guardar o simulado." });
      const results = input.answers.map((answer) => {
        const question = getQuestion(answer.questionId);
        if (!question) return null;
        return { question, selectedOption: answer.selectedOption, isCorrect: question.correctOption === answer.selectedOption };
      }).filter(Boolean) as { question: TrainingQuestion; selectedOption: number; isCorrect: boolean }[];
      await Promise.all(results.map((result) => db.insert(questionAttempts).values({ userId: ctx.user.id, questionId: result.question.id, moduleId: result.question.moduleId, topic: result.question.topic, selectedOption: result.selectedOption, isCorrect: result.isCorrect, durationSeconds: Math.round(input.durationSeconds / Math.max(results.length, 1)) })));
      const correct = results.filter((result) => result.isCorrect).length;
      await db.insert(simulationAttempts).values({ userId: ctx.user.id, mode: input.mode, totalQuestions: results.length, correctAnswers: correct, durationSeconds: input.durationSeconds, answers: input.answers, completedAt: new Date() });
      const byDiscipline = ["matematica", "fisica", "quimica", "geometria", "portugues", "cultura"].map((disciplineId) => {
        const entries = results.filter((result) => result.question.disciplineId === disciplineId);
        return { id: disciplineId, label: CURRICULUM.find((item) => item.disciplineId === disciplineId)?.discipline ?? disciplineId, total: entries.length, correct: entries.filter((entry) => entry.isCorrect).length };
      }).filter((item) => item.total);
      const weak = byDiscipline.sort((a, b) => (a.correct / a.total) - (b.correct / b.total))[0];
      const byTopic = Object.values(results.reduce<Record<string, { topic: string; total: number; correct: number }>>((acc, result) => {
        const current = acc[result.question.topic] ?? { topic: result.question.topic, total: 0, correct: 0 };
        current.total += 1;
        current.correct += result.isCorrect ? 1 : 0;
        acc[result.question.topic] = current;
        return acc;
      }, {}));
      const weakTopic = [...byTopic].sort((a, b) => (a.correct / a.total) - (b.correct / b.total))[0];
      return { total: results.length, correct, incorrect: results.length - correct, percent: results.length ? Math.round((correct / results.length) * 100) : 0, durationSeconds: input.durationSeconds, byDiscipline, byTopic, results: results.map((result) => ({ question: withoutAnswers(result.question), selectedOption: result.selectedOption, isCorrect: result.isCorrect, correctOption: result.question.correctOption, explanation: result.question.explanation })), recommendation: weak ? `Antes do próximo simulado, reveja ${weak.label}${weakTopic ? `, com foco em “${weakTopic.topic}”.` : "."}` : "Continue a praticar com questões de treino." };
    }),
  }),
});
