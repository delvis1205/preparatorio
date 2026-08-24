CREATE TABLE `saved_lesson_expansions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` varchar(120) NOT NULL,
	`focus` varchar(240) NOT NULL,
	`title` varchar(240) NOT NULL,
	`explanation` text NOT NULL,
	`workedExample` text NOT NULL,
	`selfCheck` text NOT NULL,
	`answerGuide` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `saved_lesson_expansions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `saved_lesson_expansions_user_idx` ON `saved_lesson_expansions` (`userId`);--> statement-breakpoint
CREATE INDEX `saved_lesson_expansions_user_module_idx` ON `saved_lesson_expansions` (`userId`,`moduleId`);