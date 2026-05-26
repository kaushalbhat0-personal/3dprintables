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
  | "decor"
  | "gadgets"
  | "cosplay"
  | "home"
  | "jewelry"
  | "prototypes"
  | "toys"
  | "custom"

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "decor", label: "Home Decor" },
  { value: "gadgets", label: "Gadgets" },
  { value: "cosplay", label: "Cosplay" },
  { value: "home", label: "Utility" },
  { value: "jewelry", label: "Jewelry" },
  { value: "prototypes", label: "Prototypes" },
  { value: "toys", label: "Toys & Games" },
  { value: "custom", label: "Custom Orders" },
]
