export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  imageUrl: string
  productId: string | null
  featured: boolean
  createdAt: string
}

export type CreateTestimonialInput = Pick<
  Testimonial,
  "name" | "role" | "company" | "content"
> & {
  rating?: number
  imageUrl?: string
  productId?: string | null
  featured?: boolean
}

export type UpdateTestimonialInput = Partial<CreateTestimonialInput> & {
  id: string
}
