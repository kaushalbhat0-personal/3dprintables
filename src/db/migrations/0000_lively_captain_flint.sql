CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`product` text NOT NULL,
	`category` text NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`preferred_size` text DEFAULT '' NOT NULL,
	`customizable` integer DEFAULT false NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`source_page` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text DEFAULT '(datetime(''now''))' NOT NULL
);
