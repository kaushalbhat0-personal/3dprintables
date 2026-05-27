"use server"

import { revalidatePath } from "next/cache"
import {
  createTestimonialQuery,
  updateTestimonialQuery,
  deleteTestimonialQuery,
  getTestimonialsQuery,
  getFeaturedTestimonialsQuery,
} from "@/db/queries/testimonials"
import type { CreateTestimonialInput } from "@/lib/storage/testimonial-types"

export async function createTestimonialAction(formData: FormData) {
  try {
    const input: CreateTestimonialInput = {
      name: formData.get("name") as string,
      role: (formData.get("role") as string) ?? "",
      company: (formData.get("company") as string) ?? "",
      content: formData.get("content") as string,
      rating: Number(formData.get("rating")) || 5,
      imageUrl: (formData.get("imageUrl") as string) ?? "",
      productId: (formData.get("productId") as string) || null,
      featured: formData.get("featured") === "true" || formData.get("featured") === "on",
    }
    if (!input.name || !input.content) {
      return { success: false as const, error: "Name and content are required" }
    }
    revalidatePath("/admin/testimonials")
    revalidatePath("/")
    return createTestimonialQuery(input)
  } catch (err) {
    return {
      success: false as const,
      error: err instanceof Error ? err.message : "Failed to create testimonial",
    }
  }
}

export async function updateTestimonialAction(formData: FormData) {
  try {
    const id = formData.get("id") as string
    if (!id) return { success: false as const, error: "Testimonial ID required" }

    const fields: Record<string, unknown> = {}
    for (const [key, value] of formData.entries()) {
      if (key === "id") continue
      if (key === "rating") fields[key] = Number(value)
      else if (key === "featured") fields[key] = value === "true" || value === "on"
      else if (key === "productId") fields[key] = value || null
      else fields[key] = value
    }

    revalidatePath("/admin/testimonials")
    revalidatePath("/")
    return updateTestimonialQuery({ id, ...fields })
  } catch (err) {
    return {
      success: false as const,
      error: err instanceof Error ? err.message : "Failed to update testimonial",
    }
  }
}

export async function deleteTestimonialAction(id: string) {
  const result = await deleteTestimonialQuery(id)
  if (result.success) {
    revalidatePath("/admin/testimonials")
    revalidatePath("/")
  }
  return result
}

export async function toggleFeaturedTestimonialAction(
  id: string,
  featured: boolean
) {
  const result = await updateTestimonialQuery({ id, featured })
  if (result.success) {
    revalidatePath("/admin/testimonials")
    revalidatePath("/")
  }
  return result
}

export async function getTestimonialsAction() {
  return getTestimonialsQuery()
}

export async function getFeaturedTestimonialsAction() {
  return getFeaturedTestimonialsQuery()
}
