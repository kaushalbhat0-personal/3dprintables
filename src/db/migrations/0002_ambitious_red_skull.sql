CREATE TABLE `product_videos` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`video_url` text NOT NULL,
	`thumbnail_url` text DEFAULT '' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT '(datetime(''now''))' NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`role` text DEFAULT '' NOT NULL,
	`company` text DEFAULT '' NOT NULL,
	`content` text NOT NULL,
	`rating` integer DEFAULT 5 NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`product_id` text,
	`featured` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT '(datetime(''now''))' NOT NULL,
	`updated_at` text DEFAULT '(datetime(''now''))' NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE set null
);
