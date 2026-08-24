CREATE TABLE `automation_config` (
	`id` int AUTO_INCREMENT NOT NULL,
	`configKey` varchar(80) NOT NULL,
	`scheduleCronTaskUid` varchar(65),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `automation_config_id` PRIMARY KEY(`id`),
	CONSTRAINT `automation_config_key_unique` UNIQUE(`configKey`)
);
--> statement-breakpoint
CREATE TABLE `email_deliveries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`eventKey` varchar(160) NOT NULL,
	`kind` enum('welcome','password_reset','module_complete','simulation','weekly_progress') NOT NULL,
	`subject` varchar(240) NOT NULL,
	`sentAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `email_deliveries_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_deliveries_user_event_unique` UNIQUE(`userId`,`eventKey`)
);
--> statement-breakpoint
CREATE INDEX `email_deliveries_user_idx` ON `email_deliveries` (`userId`);