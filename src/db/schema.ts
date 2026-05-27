import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { relations } from "drizzle-orm"

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  product: text("product").notNull(),
  category: text("category").notNull(),
  quantity: integer("quantity").notNull().default(1),
  preferredSize: text("preferred_size").notNull().default(""),
  customizable: integer("customizable", { mode: "boolean" })
    .notNull()
    .default(false),
  message: text("message").notNull().default(""),
  sourcePage: text("source_page").notNull(),
  status: text("status", {
    enum: ["new", "contacted", "quoted", "completed"],
  })
    .notNull()
    .default("new"),
  createdAt: text("created_at")
    .notNull()
    .default("(datetime('now'))"),
})

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
  shortDescription: text("short_description").notNull().default(""),
  category: text("category", {
    enum: ["spiritual-decor", "cosplay", "prototypes", "custom"],
  }).notNull(),
  priceRange: text("price_range").notNull().default(""),
  material: text("material").notNull().default(""),
  dimensions: text("dimensions").notNull().default(""),
  technologies: text("technologies").notNull().default("[]"),
  featuredImage: text("featured_image").notNull().default(""),
  isFeatured: integer("is_featured", { mode: "boolean" })
    .notNull()
    .default(false),
  isActive: integer("is_active", { mode: "boolean" })
    .notNull()
    .default(true),
  supportsBulkOrders: integer("supports_bulk_orders", { mode: "boolean" })
    .notNull()
    .default(false),
  customizable: integer("customizable", { mode: "boolean" })
    .notNull()
    .default(false),
  printTime: text("print_time").notNull().default(""),
  finishType: text("finish_type").notNull().default(""),
  productionType: text("production_type", {
    enum: ["prototype", "single", "batch", "custom"],
  }).default("single"),
  minimumOrderQuantity: text("minimum_order_quantity").notNull().default(""),
  createdAt: text("created_at")
    .notNull()
    .default("(datetime('now'))"),
  updatedAt: text("updated_at")
    .notNull()
    .default("(datetime('now'))"),
})

export const productImages = sqliteTable("product_images", {
  id: text("id").primaryKey(),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default("(datetime('now'))"),
})

export const productRelations = relations(products, ({ many }) => ({
  images: many(productImages),
}))

export const productImageRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}))
