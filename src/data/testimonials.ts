import { unstable_cache } from "next/cache"
import type { Testimonial } from "@/lib/storage/testimonial-types"
import { getFeaturedTestimonialsQuery, getTestimonialsQuery } from "@/db/queries/testimonials"

export const getFeaturedTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const result = await getFeaturedTestimonialsQuery()
    return result.success ? result.data : []
  },
  ["featured-testimonials-all"],
  { tags: ["featured-testimonials", "testimonials"], revalidate: 3600 }
)

export const getAllTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const result = await getTestimonialsQuery()
    return result.success ? result.data : []
  },
  ["testimonials-all"],
  { tags: ["testimonials"], revalidate: 3600 }
)
