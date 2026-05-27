export interface Product {
  id: string
  title: string
  slug: string
  category: ProductCategory
  description: string
  shortDescription: string
  image: string
  images?: string[]
  priceRange?: string
  material?: string
  dimensions?: string
  technologies?: string[]
  featured?: boolean
  createdAt: string
}

export type ProductCategory =
  | "spiritual-decor"
  | "cosplay"
  | "prototypes"
  | "custom"

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "spiritual-decor", label: "Spiritual Decor" },
  { value: "cosplay", label: "Cosplay & Props" },
  { value: "prototypes", label: "Prototypes & Engineering" },
  { value: "custom", label: "Custom Orders" },
]
