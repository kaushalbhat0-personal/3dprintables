import { cache } from "react"
import type { Testimonial } from "@/lib/storage/testimonial-types"
import { getFeaturedTestimonialsQuery, getTestimonialsQuery } from "@/db/queries/testimonials"

export const getFeaturedTestimonials = cache(async (): Promise<Testimonial[]> => {
  const result = await getFeaturedTestimonialsQuery()
  return result.success ? result.data : []
})

export const getAllTestimonials = cache(async (): Promise<Testimonial[]> => {
  const result = await getTestimonialsQuery()
  return result.success ? result.data : []
})
