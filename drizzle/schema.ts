import { boolean, index, integer, jsonb, pgTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

const createdAt = (name: string) => timestamp(name, { withTimezone: true }).defaultNow().notNull();
const updatedAt = (name: string) => timestamp(name, { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date());
const id = () => integer("id").generatedAlwaysAsIdentity().primaryKey();

export const users = pgTable("users", {
  id: id(),
  openId: varchar("openId", { length: 64 }),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 32 }),
  passwordHash: varchar("passwordHash", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: varchar("role", { length: 16 }).notNull().default("user"),
  createdAt: createdAt("createdAt"),
  updatedAt: updatedAt("updatedAt"),
  lastSignedIn: createdAt("lastSignedIn"),
}, table => [
  uniqueIndex("users_open_id_unique").on(table.openId),
  uniqueIndex("users_email_unique").on(table.email),
  uniqueIndex("users_phone_unique").on(table.phone),
]);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const studentProfiles = pgTable("student_profiles", {
  id: id(),
  userId: integer("userId").notNull(),
  displayName: varchar("displayName", { length: 80 }).notNull(),
  examDate: varchar("examDate", { length: 32 }),
  dailyMinutes: integer("dailyMinutes").notNull().default(45),
  studyDays: jsonb("studyDays").$type<string[]>().notNull(),
  goal: text("goal"),
  theme: varchar("theme", { length: 16 }).notNull().default("system"),
  createdAt: createdAt("createdAt"),
  updatedAt: updatedAt("updatedAt"),
}, table => [uniqueIndex("student_profiles_user_unique").on(table.userId)]);

export const moduleProgress = pgTable("module_progress", {
  id: id(),
  userId: integer("userId").notNull(),
  moduleId: varchar("moduleId", { length: 120 }).notNull(),
  status: varchar("status", { length: 16 }).notNull().default("not_started"),
  completionPercent: integer("completionPercent").notNull().default(0),
  mastery: integer("mastery").notNull().default(0),
  currentLessonId: varchar("currentLessonId", { length: 120 }),
  lastAccessedAt: createdAt("lastAccessedAt"),
  updatedAt: updatedAt("updatedAt"),
}, table => [
  uniqueIndex("module_progress_user_module_unique").on(table.userId, table.moduleId),
  index("module_progress_user_idx").on(table.userId),
]);

export const questionAttempts = pgTable("question_attempts", {
  id: id(),
  userId: integer("userId").notNull(),
  questionId: varchar("questionId", { length: 120 }).notNull(),
  moduleId: varchar("moduleId", { length: 120 }).notNull(),
  topic: varchar("topic", { length: 240 }).notNull(),
  selectedOption: integer("selectedOption").notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  durationSeconds: integer("durationSeconds").notNull().default(0),
  createdAt: createdAt("createdAt"),
}, table => [
  index("question_attempts_user_idx").on(table.userId),
  index("question_attempts_module_idx").on(table.userId, table.moduleId),
]);

export const simulationAttempts = pgTable("simulation_attempts", {
  id: id(),
  userId: integer("userId").notNull(),
  mode: varchar("mode", { length: 16 }).notNull(),
  totalQuestions: integer("totalQuestions").notNull(),
  correctAnswers: integer("correctAnswers").notNull(),
  durationSeconds: integer("durationSeconds").notNull(),
  answers: jsonb("answers").$type<{ questionId: string; selectedOption: number }[]>().notNull(),
  completedAt: createdAt("completedAt"),
}, table => [index("simulation_attempts_user_idx").on(table.userId)]);

export const favorites = pgTable("favorites", {
  id: id(),
  userId: integer("userId").notNull(),
  resourceType: varchar("resourceType", { length: 16 }).notNull(),
  resourceId: varchar("resourceId", { length: 120 }).notNull(),
  createdAt: createdAt("createdAt"),
}, table => [uniqueIndex("favorites_user_resource_unique").on(table.userId, table.resourceType, table.resourceId)]);

export const notes = pgTable("notes", {
  id: id(),
  userId: integer("userId").notNull(),
  moduleId: varchar("moduleId", { length: 120 }),
  body: text("body").notNull(),
  createdAt: createdAt("createdAt"),
  updatedAt: updatedAt("updatedAt"),
}, table => [index("notes_user_idx").on(table.userId)]);

export const studyPlans = pgTable("study_plans", {
  id: id(),
  userId: integer("userId").notNull(),
  title: varchar("title", { length: 120 }).notNull(),
  dailyMinutes: integer("dailyMinutes").notNull(),
  tasks: jsonb("tasks").$type<{ id: string; label: string; minutes: number; done: boolean; moduleId?: string }[]>().notNull(),
  lastChallengeDate: varchar("lastChallengeDate", { length: 10 }),
  lastChallengeQuestionId: varchar("lastChallengeQuestionId", { length: 120 }),
  lastChallengeCompletedAt: timestamp("lastChallengeCompletedAt", { withTimezone: true }),
  createdAt: createdAt("createdAt"),
  updatedAt: updatedAt("updatedAt"),
}, table => [uniqueIndex("study_plans_user_unique").on(table.userId)]);

export const aiConversations = pgTable("ai_conversations", {
  id: id(),
  userId: integer("userId").notNull(),
  title: varchar("title", { length: 160 }).notNull(),
  context: jsonb("context").$type<{ moduleId?: string; questionId?: string }>(),
  createdAt: createdAt("createdAt"),
  updatedAt: updatedAt("updatedAt"),
}, table => [index("ai_conversations_user_idx").on(table.userId)]);

export const aiMessages = pgTable("ai_messages", {
  id: id(),
  conversationId: integer("conversationId").notNull(),
  role: varchar("role", { length: 16 }).notNull(),
  content: text("content").notNull(),
  createdAt: createdAt("createdAt"),
}, table => [index("ai_messages_conversation_idx").on(table.conversationId)]);

export const savedLessonExpansions = pgTable("saved_lesson_expansions", {
  id: id(),
  userId: integer("userId").notNull(),
  moduleId: varchar("moduleId", { length: 120 }).notNull(),
  focus: varchar("focus", { length: 240 }).notNull(),
  title: varchar("title", { length: 240 }).notNull(),
  explanation: text("explanation").notNull(),
  workedExample: text("workedExample").notNull(),
  selfCheck: text("selfCheck").notNull(),
  answerGuide: text("answerGuide").notNull(),
  createdAt: createdAt("createdAt"),
  updatedAt: updatedAt("updatedAt"),
}, table => [
  index("saved_lesson_expansions_user_idx").on(table.userId),
  index("saved_lesson_expansions_user_module_idx").on(table.userId, table.moduleId),
]);

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: id(),
  userId: integer("userId").notNull(),
  tokenHash: varchar("tokenHash", { length: 128 }).notNull(),
  expiresAt: timestamp("expiresAt", { withTimezone: true }).notNull(),
  usedAt: timestamp("usedAt", { withTimezone: true }),
  createdAt: createdAt("createdAt"),
}, table => [
  uniqueIndex("password_reset_tokens_hash_unique").on(table.tokenHash),
  index("password_reset_tokens_user_idx").on(table.userId),
]);

export const emailDeliveries = pgTable("email_deliveries", {
  id: id(),
  userId: integer("userId").notNull(),
  eventKey: varchar("eventKey", { length: 160 }).notNull(),
  kind: varchar("kind", { length: 32 }).notNull(),
  subject: varchar("subject", { length: 240 }).notNull(),
  sentAt: createdAt("sentAt"),
}, table => [
  uniqueIndex("email_deliveries_user_event_unique").on(table.userId, table.eventKey),
  index("email_deliveries_user_idx").on(table.userId),
]);

export const automationConfig = pgTable("automation_config", {
  id: id(),
  configKey: varchar("configKey", { length: 80 }).notNull(),
  scheduleCronTaskUid: varchar("scheduleCronTaskUid", { length: 65 }),
  updatedAt: updatedAt("updatedAt"),
}, table => [uniqueIndex("automation_config_key_unique").on(table.configKey)]);
