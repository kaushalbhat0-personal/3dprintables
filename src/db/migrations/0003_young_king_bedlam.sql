CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`image` text,
	`role` text DEFAULT 'user' NOT NULL,
	`created_at` text DEFAULT '(datetime(''now''))' NOT NULL,
	`updated_at` text DEFAULT '(datetime(''now''))' NOT NULL,
	`last_login_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
DROP INDEX "products_slug_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `products` ALTER COLUMN "is_active" TO "is_active" integer NOT NULL DEFAULT false;--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);--> statement-breakpoint
ALTER TABLE `products` ADD `sort_order` integer DEFAULT 999 NOT NULL;--> statement-breakpoint
ALTER TABLE `inquiries` ADD `attachments` text DEFAULT '[]' NOT NULL;--> statement-breakpoint
ALTER TABLE `inquiries` ADD `user_id` text REFERENCES users(id);