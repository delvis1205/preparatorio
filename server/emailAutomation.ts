import { and, eq, gte, isNotNull } from "drizzle-orm";
import { emailDeliveries, moduleProgress, questionAttempts, simulationAttempts, users } from "../drizzle/schema";
import { CURRICULUM } from "./content";
import { getDb } from "./db";
import { sendWeeklyProgressEmail } from "./email";
import { calculateStudyStreak } from "./routers/learning";

type DeliveryKind = "welcome" | "password_reset" | "module_complete" | "simulation" | "weekly_progress";

export async function sendOnce(input: { userId: number; eventKey: string; kind: DeliveryKind; subject: string; send: () => Promise<void> }) {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível.");
  const existing = await db.select({ id: emailDeliveries.id }).from(emailDeliveries).where(and(eq(emailDeliveries.userId, input.userId), eq(emailDeliveries.eventKey, input.eventKey))).limit(1);
  if (existing[0]) return { sent: false, duplicate: true } as const;
  await input.send();
  await db.insert(emailDeliveries).values({ userId: input.userId, eventKey: input.eventKey, kind: input.kind, subject: input.subject });
  return { sent: true, duplicate: false } as const;
}

function weekKey(now = new Date()) {
  const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() - day + 1);
  return date.toISOString().slice(0, 10);
}

export async function sendWeeklyProgressEmails(appUrl: string, now = new Date()) {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível.");
  const since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const students = await db.select().from(users).where(isNotNull(users.email));
  let sent = 0; let skipped = 0;
  for (const student of students) {
    if (!student.email) { skipped += 1; continue; }
    const [attempts, simulations, progress] = await Promise.all([
      db.select().from(questionAttempts).where(and(eq(questionAttempts.userId, student.id), gte(questionAttempts.createdAt, since))),
      db.select().from(simulationAttempts).where(and(eq(simulationAttempts.userId, student.id), gte(simulationAttempts.completedAt, since))),
      db.select().from(moduleProgress).where(eq(moduleProgress.userId, student.id)),
    ]);
    if (!attempts.length && !simulations.length) { skipped += 1; continue; }
    const minutes = Math.round((attempts.reduce((total, attempt) => total + Math.max(0, attempt.durationSeconds), 0) + simulations.reduce((total, simulation) => total + Math.max(0, simulation.durationSeconds), 0)) / 60);
    const correct = attempts.filter((attempt) => attempt.isCorrect).length + simulations.reduce((total, simulation) => total + simulation.correctAnswers, 0);
    const questions = attempts.length + simulations.reduce((total, simulation) => total + simulation.totalQuestions, 0);
    const accuracy = questions ? Math.round((correct / questions) * 100) : 0;
    const next = CURRICULUM.map((module) => ({ title: module.title, mastery: progress.find((row) => row.moduleId === module.id)?.mastery ?? 0 })).sort((a, b) => a.mastery - b.mastery)[0];
    const streak = calculateStudyStreak([...attempts.map((attempt) => attempt.createdAt), ...simulations.map((simulation) => simulation.completedAt)], now);
    const result = await sendOnce({ userId: student.id, eventKey: `weekly-progress:${weekKey(now)}`, kind: "weekly_progress", subject: `O seu resumo semanal: ${minutes} min de estudo — LUANDA PREP`, send: () => sendWeeklyProgressEmail({ to: student.email!, name: student.name, minutes, questions, accuracy, streak, nextTitle: next?.title ?? "o seu próximo módulo", appUrl }) });
    if (result.sent) sent += 1; else skipped += 1;
  }
  return { sent, skipped, week: weekKey(now) };
}
