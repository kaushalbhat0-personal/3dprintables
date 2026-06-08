import { z } from "zod"

export const CreateTestimonialSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  role: z.string().max(200).default(""),
  company: z.string().max(200).default(""),
  content: z.string().min(1, "Content is required").max(2000),
  rating: z.number().int().min(1).max(5).default(5),
  imageUrl: z.string().max(500).default(""),
  productId: z.string().nullable().default(null),
  featured: z.boolean().default(false),
})

export const UpdateTestimonialSchema = CreateTestimonialSchema.partial().extend({
  id: z.string().min(1, "Testimonial ID is required"),
})

export type CreateTestimonialData = z.infer<typeof CreateTestimonialSchema>
export type UpdateTestimonialData = z.infer<typeof UpdateTestimonialSchema>
