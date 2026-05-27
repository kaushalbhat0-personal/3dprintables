import type { Product } from "@/types"
import {
  getActiveProductsQuery,
  getFeaturedProductsQuery,
  getProductBySlugQuery,
  getProductsByCategoryQuery,
} from "@/db/queries/products"
import { getProductVideosQuery } from "@/db/queries/videos"
import type { ProductVideo } from "@/db/queries/videos"
import { cache } from "react"

export const getProducts = cache(async (): Promise<Product[]> => {
  const result = await getActiveProductsQuery()
  return result.success ? result.data : []
})

export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  const result = await getFeaturedProductsQuery()
  return result.success ? result.data : []
})

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | undefined> => {
    const result = await getProductBySlugQuery(slug)
    return result.success ? result.data : undefined
  }
)

export const getProductsByCategory = cache(
  async (category: string): Promise<Product[]> => {
    const result = await getProductsByCategoryQuery(category)
    return result.success ? result.data : []
  }
)

export const getProductVideos = cache(
  async (productId: string): Promise<ProductVideo[]> => {
    const result = await getProductVideosQuery(productId)
    return result.success ? result.data : []
  }
)
