import { z } from "zod"

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
  description: z.string().max(500).default(""),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
})

export const UpdateCategorySchema = CreateCategorySchema.partial().extend({
  id: z.string().min(1),
})

export type CreateCategoryData = z.infer<typeof CreateCategorySchema>
export type UpdateCategoryData = z.infer<typeof UpdateCategorySchema>
