CREATE TABLE "ai_conversations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ai_conversations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"title" varchar(160) NOT NULL,
	"context" jsonb,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_messages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ai_messages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"conversationId" integer NOT NULL,
	"role" varchar(16) NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "automation_config" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "automation_config_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"configKey" varchar(80) NOT NULL,
	"scheduleCronTaskUid" varchar(65),
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "email_deliveries" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "email_deliveries_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"eventKey" varchar(160) NOT NULL,
	"kind" varchar(32) NOT NULL,
	"subject" varchar(240) NOT NULL,
	"sentAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "favorites_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"resourceType" varchar(16) NOT NULL,
	"resourceId" varchar(120) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "module_progress" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "module_progress_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"moduleId" varchar(120) NOT NULL,
	"status" varchar(16) DEFAULT 'not_started' NOT NULL,
	"completionPercent" integer DEFAULT 0 NOT NULL,
	"mastery" integer DEFAULT 0 NOT NULL,
	"currentLessonId" varchar(120),
	"lastAccessedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "notes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"moduleId" varchar(120),
	"body" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "password_reset_tokens" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "password_reset_tokens_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"tokenHash" varchar(128) NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL,
	"usedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question_attempts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "question_attempts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"questionId" varchar(120) NOT NULL,
	"moduleId" varchar(120) NOT NULL,
	"topic" varchar(240) NOT NULL,
	"selectedOption" integer NOT NULL,
	"isCorrect" boolean NOT NULL,
	"durationSeconds" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_lesson_expansions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "saved_lesson_expansions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"moduleId" varchar(120) NOT NULL,
	"focus" varchar(240) NOT NULL,
	"title" varchar(240) NOT NULL,
	"explanation" text NOT NULL,
	"workedExample" text NOT NULL,
	"selfCheck" text NOT NULL,
	"answerGuide" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "simulation_attempts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "simulation_attempts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"mode" varchar(16) NOT NULL,
	"totalQuestions" integer NOT NULL,
	"correctAnswers" integer NOT NULL,
	"durationSeconds" integer NOT NULL,
	"answers" jsonb NOT NULL,
	"completedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_profiles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "student_profiles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"displayName" varchar(80) NOT NULL,
	"examDate" varchar(32),
	"dailyMinutes" integer DEFAULT 45 NOT NULL,
	"studyDays" jsonb NOT NULL,
	"goal" text,
	"theme" varchar(16) DEFAULT 'system' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "study_plans" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "study_plans_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"title" varchar(120) NOT NULL,
	"dailyMinutes" integer NOT NULL,
	"tasks" jsonb NOT NULL,
	"lastChallengeDate" varchar(10),
	"lastChallengeQuestionId" varchar(120),
	"lastChallengeCompletedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"openId" varchar(64),
	"name" text,
	"email" varchar(320),
	"phone" varchar(32),
	"passwordHash" varchar(255),
	"loginMethod" varchar(64),
	"role" varchar(16) DEFAULT 'user' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "ai_conversations_user_idx" ON "ai_conversations" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "ai_messages_conversation_idx" ON "ai_messages" USING btree ("conversationId");--> statement-breakpoint
CREATE UNIQUE INDEX "automation_config_key_unique" ON "automation_config" USING btree ("configKey");--> statement-breakpoint
CREATE UNIQUE INDEX "email_deliveries_user_event_unique" ON "email_deliveries" USING btree ("userId","eventKey");--> statement-breakpoint
CREATE INDEX "email_deliveries_user_idx" ON "email_deliveries" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "favorites_user_resource_unique" ON "favorites" USING btree ("userId","resourceType","resourceId");--> statement-breakpoint
CREATE UNIQUE INDEX "module_progress_user_module_unique" ON "module_progress" USING btree ("userId","moduleId");--> statement-breakpoint
CREATE INDEX "module_progress_user_idx" ON "module_progress" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "notes_user_idx" ON "notes" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "password_reset_tokens_hash_unique" ON "password_reset_tokens" USING btree ("tokenHash");--> statement-breakpoint
CREATE INDEX "password_reset_tokens_user_idx" ON "password_reset_tokens" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "question_attempts_user_idx" ON "question_attempts" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "question_attempts_module_idx" ON "question_attempts" USING btree ("userId","moduleId");--> statement-breakpoint
CREATE INDEX "saved_lesson_expansions_user_idx" ON "saved_lesson_expansions" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "saved_lesson_expansions_user_module_idx" ON "saved_lesson_expansions" USING btree ("userId","moduleId");--> statement-breakpoint
CREATE INDEX "simulation_attempts_user_idx" ON "simulation_attempts" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "student_profiles_user_unique" ON "student_profiles" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "study_plans_user_unique" ON "study_plans" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "users_open_id_unique" ON "users" USING btree ("openId");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "users_phone_unique" ON "users" USING btree ("phone");