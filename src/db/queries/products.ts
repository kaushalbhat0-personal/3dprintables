import { db } from "@/db"
import { products, productImages } from "@/db/schema"
import { eq, desc, asc, and, inArray } from "drizzle-orm"
import { randomUUID } from "crypto"
import type { Product, ProductCategory } from "@/types"

export type ProductRow = typeof products.$inferSelect
export type ProductImageRow = typeof productImages.$inferSelect

export async function createProductQuery(input: {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  category: string
  priceRange: string
  material: string
  dimensions: string
  technologies: string
  featuredImage: string
  isFeatured: boolean
  isActive: boolean
  supportsBulkOrders: boolean
  customizable: boolean
  printTime: string
  finishType: string
  productionType: string | null
  minimumOrderQuantity: string
  sortOrder: number
  galleryImages: string[]
}): Promise<{ success: true; data: Product } | { success: false; error: string }> {
  try {
    const now = new Date().toISOString()
    await db.insert(products).values({
      id: input.id,
      name: input.name,
      slug: input.slug,
      description: input.description,
      shortDescription: input.shortDescription,
      category: input.category as ProductCategory,
      priceRange: input.priceRange,
      material: input.material,
      dimensions: input.dimensions,
      technologies: input.technologies,
      featuredImage: input.featuredImage,
      isFeatured: input.isFeatured,
      isActive: input.isActive,
      supportsBulkOrders: input.supportsBulkOrders,
      customizable: input.customizable,
      printTime: input.printTime,
      finishType: input.finishType,
      productionType: input.productionType as "prototype" | "single" | "batch" | "custom" | null,
      minimumOrderQuantity: input.minimumOrderQuantity,
      sortOrder: input.sortOrder,
      createdAt: now,
      updatedAt: now,
    })

    if (input.galleryImages.length > 0) {
      await db.insert(productImages).values(
        input.galleryImages.map((url, i) => ({
          id: randomUUID(),
          productId: input.id,
          imageUrl: url,
          sortOrder: i,
          createdAt: now,
        }))
      )
    }

    const productData = await getProductWithImages(input.id) as Product
    return { success: true, data: productData }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create product",
    }
  }
}

export async function updateProductQuery(
  id: string,
  input: Partial<{
    name: string
    slug: string
    description: string
    shortDescription: string
    category: string
    priceRange: string
    material: string
    dimensions: string
    technologies: string
    featuredImage: string
    isFeatured: boolean
    isActive: boolean
    supportsBulkOrders: boolean
    customizable: boolean
    printTime: string
    finishType: string
    productionType: string | null
    minimumOrderQuantity: string
    sortOrder: number
    galleryImages: string[]
  }>
): Promise<{ success: true; data: Product } | { success: false; error: string }> {
  try {
    const now = new Date().toISOString()
    const { galleryImages, productionType, category, ...fields } = input
    await db
      .update(products)
      .set({
        ...fields,
        category: category as
          | "spiritual-decor"
          | "cosplay"
          | "prototypes"
          | "custom"
          | undefined,
        productionType: productionType as
          | "prototype"
          | "single"
          | "batch"
          | "custom"
          | null
          | undefined,
        updatedAt: now,
      })
      .where(eq(products.id, id))

    if (galleryImages !== undefined) {
      await db.delete(productImages).where(eq(productImages.productId, id))
      if (galleryImages.length > 0) {
        await db.insert(productImages).values(
          galleryImages.map((url, i) => ({
            id: randomUUID(),
            productId: id,
            imageUrl: url,
            sortOrder: i,
            createdAt: now,
          }))
        )
      }
    }

    const afterUpdate = await getProductByIdQuery(id)
    if (!afterUpdate.success) return { success: false, error: "Product not found after update" }
    return { success: true, data: afterUpdate.data }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update product",
    }
  }
}

export async function deleteProductQuery(
  id: string
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await db.delete(productImages).where(eq(productImages.productId, id))
    await db.delete(products).where(eq(products.id, id))
    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete product",
    }
  }
}

async function getProductWithImages(id: string): Promise<{
  images: ProductImageRow[]
} & Product> {
  const row = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1)
    .then((r) => r[0])

  const imgs = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, id))
    .orderBy(asc(productImages.sortOrder))

  return { ...mapRowToProduct(row, imgs), images: imgs }
}

function mapRowToProduct(
  row: ProductRow,
  imgs: ProductImageRow[]
): Product {
  return {
    id: row.id,
    title: row.name,
    slug: row.slug,
    category: row.category,
    description: row.description,
    shortDescription: row.shortDescription,
    featuredImage: row.featuredImage,
    galleryImages: imgs.map((i) => i.imageUrl),
    priceRange: row.priceRange || undefined,
    material: row.material || undefined,
    dimensions: row.dimensions || undefined,
    technologies: (() => { try { const p = JSON.parse(row.technologies); return Array.isArray(p) ? p : [] } catch { return [] } })(),
    featured: row.isFeatured,
    isActive: row.isActive,
    sortOrder: row.sortOrder,
    printTime: row.printTime || undefined,
    finishType: row.finishType || undefined,
    productionType: (row.productionType as Product["productionType"]) ?? undefined,
    supportsBulkOrders: row.supportsBulkOrders || undefined,
    customizable: row.customizable || undefined,
    minimumOrderQuantity: row.minimumOrderQuantity || undefined,
    createdAt: row.createdAt,
  }
}

export async function getProductsQuery(): Promise<
  { success: true; data: Product[] } | { success: false; error: string }
> {
  try {
    const rows = await db
      .select()
      .from(products)
      .orderBy(asc(products.sortOrder), desc(products.createdAt))

    const allImages = await db
      .select()
      .from(productImages)
      .orderBy(asc(productImages.sortOrder))

    const imageMap = new Map<string, ProductImageRow[]>()
    for (const img of allImages) {
      const list = imageMap.get(img.productId) ?? []
      list.push(img)
      imageMap.set(img.productId, list)
    }

    return {
      success: true,
      data: rows.map((r) => mapRowToProduct(r, imageMap.get(r.id) ?? [])),
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to fetch products",
    }
  }
}

export async function getActiveProductsQuery(): Promise<
  { success: true; data: Product[] } | { success: false; error: string }
> {
  try {
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.isActive, true))
      .orderBy(asc(products.sortOrder), desc(products.createdAt))

    const activeIds = rows.map((r) => r.id)
    const allImages = activeIds.length > 0
      ? await db
          .select()
          .from(productImages)
          .where(inArray(productImages.productId, activeIds))
          .orderBy(asc(productImages.sortOrder))
      : []

    const imageMap = new Map<string, ProductImageRow[]>()
    for (const img of allImages) {
      const list = imageMap.get(img.productId) ?? []
      list.push(img)
      imageMap.set(img.productId, list)
    }

    return {
      success: true,
      data: rows.map((r) => mapRowToProduct(r, imageMap.get(r.id) ?? [])),
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to fetch products",
    }
  }
}

export async function getProductByIdQuery(
  id: string
): Promise<
  { success: true; data: Product } | { success: false; error: string }
> {
  try {
    const row = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1)
      .then((r) => r[0])
    if (!row) return { success: false, error: "Product not found" }
    const imgs = await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, id))
      .orderBy(asc(productImages.sortOrder))
    return { success: true, data: mapRowToProduct(row, imgs) }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to fetch product",
    }
  }
}

export async function getProductBySlugQuery(
  slug: string
): Promise<
  { success: true; data: Product } | { success: false; error: string }
> {
  try {
    const row = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1)
      .then((r) => r[0])
    if (!row) return { success: false, error: "Product not found" }
    const imgs = await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, row.id))
      .orderBy(asc(productImages.sortOrder))
    return { success: true, data: mapRowToProduct(row, imgs) }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to fetch product",
    }
  }
}

export async function getFeaturedProductsQuery(): Promise<
  { success: true; data: Product[] } | { success: false; error: string }
> {
  try {
    const rows = await db
      .select()
      .from(products)
      .where(and(eq(products.isFeatured, true), eq(products.isActive, true)))
      .orderBy(asc(products.sortOrder), desc(products.createdAt))

    const allImages = await db
      .select()
      .from(productImages)
      .orderBy(asc(productImages.sortOrder))

    const imageMap = new Map<string, ProductImageRow[]>()
    for (const img of allImages) {
      const list = imageMap.get(img.productId) ?? []
      list.push(img)
      imageMap.set(img.productId, list)
    }

    return {
      success: true,
      data: rows.map((r) => mapRowToProduct(r, imageMap.get(r.id) ?? [])),
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to fetch featured products",
    }
  }
}

export async function getProductsByCategoryQuery(
  category: string
): Promise<
  { success: true; data: Product[] } | { success: false; error: string }
> {
  try {
    const rows = await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.category, category as ProductCategory),
          eq(products.isActive, true)
        )
      )
      .orderBy(asc(products.sortOrder), desc(products.createdAt))

    const allImages = await db
      .select()
      .from(productImages)
      .orderBy(asc(productImages.sortOrder))

    const imageMap = new Map<string, ProductImageRow[]>()
    for (const img of allImages) {
      const list = imageMap.get(img.productId) ?? []
      list.push(img)
      imageMap.set(img.productId, list)
    }

    return {
      success: true,
      data: rows.map((r) => mapRowToProduct(r, imageMap.get(r.id) ?? [])),
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to fetch products by category",
    }
  }
}
