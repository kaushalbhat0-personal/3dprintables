"use server"

import { randomUUID } from "crypto"
import { revalidatePath } from "next/cache"
import { CreateProductSchema, UpdateProductSchema, ToggleFeaturedSchema } from "@/lib/validation/product"
import {
  createProductQuery,
  updateProductQuery,
  deleteProductQuery,
  getProductsQuery,
  getFeaturedProductsQuery,
} from "@/db/queries/products"
import type { Product } from "@/types"
import { setProductVideosQuery } from "@/db/queries/videos"

export async function createProductAction(
  formData: FormData
): Promise<{ success: true; data: Product } | { success: false; error: string }> {
  try {
    const raw: Record<string, unknown> = {}
    let videos: string[] = []
    formData.forEach((value, key) => {
      if (key === "technologies") {
        try { raw[key] = JSON.parse(value as string) } catch { raw[key] = (value as string).split(",").map((s: string) => s.trim()).filter(Boolean) }
      } else if (key === "galleryImages") {
        try { raw[key] = JSON.parse(value as string) } catch { raw[key] = (value as string).split("\n").map((s: string) => s.trim()).filter(Boolean) }
      } else if (key === "videos") {
        try { videos = JSON.parse(value as string) } catch { videos = [] }
      } else if (key === "isFeatured" || key === "isActive" || key === "supportsBulkOrders" || key === "customizable") {
        raw[key] = value === "true" || value === "on"
      } else {
        raw[key] = value
      }
    })

    const parsed = CreateProductSchema.parse(raw)
    const id = randomUUID()

    const result = await createProductQuery({
      id,
      ...parsed,
      technologies: JSON.stringify(parsed.technologies),
    })

    if (result.success) {
      revalidatePath("/admin/products")
      revalidatePath("/")
      revalidatePath("/catalog")
      if (videos.length > 0) {
        await setProductVideosQuery(
          id,
          videos.filter(Boolean).map((url, i) => ({ videoUrl: url, sortOrder: i }))
        )
      }
    }

    return result
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create product"
    if (err && typeof err === "object" && "issues" in err) {
      return { success: false, error: `Validation error: ${message}` }
    }
    return { success: false, error: message }
  }
}

export async function updateProductAction(
  formData: FormData
): Promise<{ success: true; data: Product } | { success: false; error: string }> {
  try {
    const raw: Record<string, unknown> = {}
    let videos: string[] | undefined
    formData.forEach((value, key) => {
      if (key === "technologies") {
        try { raw[key] = JSON.parse(value as string) } catch { raw[key] = (value as string).split(",").map((s: string) => s.trim()).filter(Boolean) }
      } else if (key === "galleryImages") {
        try { raw[key] = JSON.parse(value as string) } catch { raw[key] = (value as string).split("\n").map((s: string) => s.trim()).filter(Boolean) }
      } else if (key === "videos") {
        try { videos = JSON.parse(value as string) } catch { videos = [] }
      } else if (key === "isFeatured" || key === "isActive" || key === "supportsBulkOrders" || key === "customizable") {
        raw[key] = value === "true" || value === "on"
      } else {
        raw[key] = value
      }
    })

    const parsed = UpdateProductSchema.parse(raw)
    if (!parsed.id) return { success: false, error: "Product ID is required" }

    const result = await updateProductQuery(parsed.id, {
      ...parsed,
      name: parsed.name,
      slug: parsed.slug,
      category: parsed.category,
      technologies: parsed.technologies ? JSON.stringify(parsed.technologies) : undefined,
    })

    if (result.success) {
      revalidatePath("/admin/products")
      revalidatePath("/")
      revalidatePath("/catalog")
      if (parsed.slug) revalidatePath(`/catalog/${parsed.slug}`)
      if (videos !== undefined) {
        await setProductVideosQuery(
          parsed.id,
          videos.filter(Boolean).map((url, i) => ({ videoUrl: url, sortOrder: i }))
        )
      }
    }
    return result
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update product"
    if (err && typeof err === "object" && "issues" in err) {
      return { success: false, error: `Validation error: ${message}` }
    }
    return { success: false, error: message }
  }
}

export async function deleteProductAction(
  id: string
): Promise<{ success: true } | { success: false; error: string }> {
  const result = await deleteProductQuery(id)
  if (result.success) {
    revalidatePath("/admin/products")
    revalidatePath("/")
    revalidatePath("/catalog")
  }
  return result
}

export async function toggleFeaturedAction(
  id: string,
  isFeatured: boolean
): Promise<{ success: true; data: Product } | { success: false; error: string }> {
  const parsed = ToggleFeaturedSchema.parse({ id, isFeatured })
  const result = await updateProductQuery(parsed.id, { isFeatured: parsed.isFeatured })
  if (result.success) {
    revalidatePath("/admin/products")
    revalidatePath("/")
    revalidatePath("/catalog")
  }
  return result
}

export async function getProductsAction(): Promise<
  { success: true; data: Product[] } | { success: false; error: string }
> {
  return getProductsQuery()
}

export async function getFeaturedProductsAction(): Promise<
  { success: true; data: Product[] } | { success: false; error: string }
> {
  return getFeaturedProductsQuery()
}
