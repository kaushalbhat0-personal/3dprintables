CREATE INDEX `idx_products_is_active` ON `products` (`is_active`);--> statement-breakpoint
CREATE INDEX `idx_products_is_featured` ON `products` (`is_featured`);--> statement-breakpoint
CREATE INDEX `idx_products_category` ON `products` (`category`);--> statement-breakpoint
CREATE INDEX `idx_product_images_product_id` ON `product_images` (`product_id`);--> statement-breakpoint
CREATE INDEX `idx_inquiries_status` ON `inquiries` (`status`);--> statement-breakpoint
CREATE INDEX `idx_inquiries_created_at` ON `inquiries` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_testimonials_featured` ON `testimonials` (`featured`);--> statement-breakpoint
CREATE INDEX `idx_testimonials_product_id` ON `testimonials` (`product_id`);
