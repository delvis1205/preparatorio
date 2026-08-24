/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
import { boolean, index, int, json, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Legacy Manus OAuth identifier retained only for existing migrated accounts. */
  openId: varchar("openId", { length: 64 }),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 32 }),
  passwordHash: varchar("passwordHash", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("users_open_id_unique").on(table.openId),
  uniqueIndex("users_email_unique").on(table.email),
  uniqueIndex("users_phone_unique").on(table.phone),
]);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const studentProfiles = mysqlTable("student_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  displayName: varchar("displayName", { length: 80 }).notNull(),
  examDate: varchar("examDate", { length: 32 }),
  dailyMinutes: int("dailyMinutes").notNull().default(45),
  studyDays: json("studyDays").$type<string[]>().notNull(),
  goal: text("goal"),
  theme: mysqlEnum("theme", ["light", "dark", "system"]).notNull().default("system"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [uniqueIndex("student_profiles_user_unique").on(table.userId)]);

export const moduleProgress = mysqlTable("module_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: varchar("moduleId", { length: 120 }).notNull(),
  status: mysqlEnum("status", ["not_started", "in_progress", "completed", "review"]).notNull().default("not_started"),
  completionPercent: int("completionPercent").notNull().default(0),
  mastery: int("mastery").notNull().default(0),
  currentLessonId: varchar("currentLessonId", { length: 120 }),
  lastAccessedAt: timestamp("lastAccessedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [uniqueIndex("module_progress_user_module_unique").on(table.userId, table.moduleId), index("module_progress_user_idx").on(table.userId)]);

export const questionAttempts = mysqlTable("question_attempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  questionId: varchar("questionId", { length: 120 }).notNull(),
  moduleId: varchar("moduleId", { length: 120 }).notNull(),
  topic: varchar("topic", { length: 240 }).notNull(),
  selectedOption: int("selectedOption").notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  durationSeconds: int("durationSeconds").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [index("question_attempts_user_idx").on(table.userId), index("question_attempts_module_idx").on(table.userId, table.moduleId)]);

export const simulationAttempts = mysqlTable("simulation_attempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  mode: mysqlEnum("mode", ["practice", "exam"]).notNull(),
  totalQuestions: int("totalQuestions").notNull(),
  correctAnswers: int("correctAnswers").notNull(),
  durationSeconds: int("durationSeconds").notNull(),
  answers: json("answers").$type<{ questionId: string; selectedOption: number }[]>().notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
}, (table) => [index("simulation_attempts_user_idx").on(table.userId)]);

export const favorites = mysqlTable("favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  resourceType: mysqlEnum("resourceType", ["module", "question", "lesson"]).notNull(),
  resourceId: varchar("resourceId", { length: 120 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [uniqueIndex("favorites_user_resource_unique").on(table.userId, table.resourceType, table.resourceId)]);

export const notes = mysqlTable("notes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: varchar("moduleId", { length: 120 }),
  body: text("body").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [index("notes_user_idx").on(table.userId)]);

export const studyPlans = mysqlTable("study_plans", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 120 }).notNull(),
  dailyMinutes: int("dailyMinutes").notNull(),
  tasks: json("tasks").$type<{ id: string; label: string; minutes: number; done: boolean; moduleId?: string }[]>().notNull(),
  lastChallengeDate: varchar("lastChallengeDate", { length: 10 }),
  lastChallengeQuestionId: varchar("lastChallengeQuestionId", { length: 120 }),
  lastChallengeCompletedAt: timestamp("lastChallengeCompletedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [uniqueIndex("study_plans_user_unique").on(table.userId)]);

export const aiConversations = mysqlTable("ai_conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 160 }).notNull(),
  context: json("context").$type<{ moduleId?: string; questionId?: string }>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [index("ai_conversations_user_idx").on(table.userId)]);

export const aiMessages = mysqlTable("ai_messages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [index("ai_messages_conversation_idx").on(table.conversationId)]);

export const passwordResetTokens = mysqlTable("password_reset_tokens", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  tokenHash: varchar("tokenHash", { length: 128 }).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  usedAt: timestamp("usedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("password_reset_tokens_hash_unique").on(table.tokenHash),
  index("password_reset_tokens_user_idx").on(table.userId),
]);
