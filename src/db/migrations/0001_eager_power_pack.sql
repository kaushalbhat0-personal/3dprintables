CREATE TABLE `product_images` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`image_url` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT '(datetime(''now''))' NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`short_description` text DEFAULT '' NOT NULL,
	`category` text NOT NULL,
	`price_range` text DEFAULT '' NOT NULL,
	`material` text DEFAULT '' NOT NULL,
	`dimensions` text DEFAULT '' NOT NULL,
	`technologies` text DEFAULT '[]' NOT NULL,
	`featured_image` text DEFAULT '' NOT NULL,
	`is_featured` integer DEFAULT false NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`supports_bulk_orders` integer DEFAULT false NOT NULL,
	`customizable` integer DEFAULT false NOT NULL,
	`print_time` text DEFAULT '' NOT NULL,
	`finish_type` text DEFAULT '' NOT NULL,
	`production_type` text DEFAULT 'single',
	`minimum_order_quantity` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT '(datetime(''now''))' NOT NULL,
	`updated_at` text DEFAULT '(datetime(''now''))' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);