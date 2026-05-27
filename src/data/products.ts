import type { Product } from "@/types"

export const products: Product[] = [
  {
    id: "hanuman-gold",
    title: "Golden Hanuman Meditation Statue",
    slug: "golden-hanuman-meditation-statue",
    category: "spiritual-decor",
    description:
      "Premium meditation-style Hanuman statue printed with high-detail layered finishing and metallic coating. Designed for spiritual decor, gifting, and collectible display setups.",
    shortDescription: "Premium metallic-finish Hanuman meditation statue",
    featuredImage: "/images/products/ChromiumHanuman.jpg",
    galleryImages: [
      "/images/products/HanumanStatueRaw-1.jpg",
      "/images/products/WorkingImage-1.jpg",
    ],
    priceRange: "₹799",
    material: "PLA+, Metallic Finish",
    dimensions: "18cm × 12cm × 25cm",
    technologies: ["FDM Printing", "Surface Finishing"],
    featured: true,
    createdAt: "2025-01-15",
  },
  {
    id: "shiva-white",
    title: "Shiva Meditation Statue",
    slug: "shiva-meditation-statue",
    category: "spiritual-decor",
    description:
      "Detailed Shiva meditation sculpture optimized for smooth surface quality and scalable batch production for decor brands and spiritual collections.",
    shortDescription: "Detailed resin Shiva meditation sculpture",
    featuredImage: "/images/products/ShivaWhite.jpeg",
    galleryImages: ["/images/products/ShivaBulk.PNG"],
    priceRange: "₹699",
    material: "PLA+",
    dimensions: "15cm × 10cm × 22cm",
    technologies: ["High-Resolution FDM Printing"],
    featured: true,
    createdAt: "2025-02-01",
  },
  {
    id: "shiva-glow",
    title: "Glow-in-the-Dark Shiva Statue",
    slug: "glow-in-the-dark-shiva-statue",
    category: "spiritual-decor",
    description:
      "Glow filament Shiva print designed for ambient night illumination and premium collectible display aesthetics.",
    shortDescription: "Glow filament Shiva for ambient night display",
    featuredImage: "/images/products/ShivaGlow.jpeg",
    galleryImages: [],
    priceRange: "₹899",
    material: "Glow PLA",
    dimensions: "20cm × 15cm × 2cm",
    technologies: ["Glow Filament Printing"],
    featured: true,
    createdAt: "2025-02-10",
  },
  {
    id: "ironman-mask",
    title: "Iron Man Mask",
    slug: "iron-man-mask",
    category: "cosplay",
    description:
      "Full-scale wearable Iron Man inspired mask prototype with sanding, assembly, and finishing workflow optimized for cosplay and display applications.",
    shortDescription: "Full-scale wearable Iron Man mask prototype",
    featuredImage: "/images/products/IronManMask.jpeg",
    galleryImages: ["/images/products/IronManMaskMaking.jpeg"],
    priceRange: "₹1,499",
    material: "PLA+, Automotive Primer",
    dimensions: "28cm × 20cm × 15cm",
    technologies: ["Large Format FDM Printing"],
    featured: true,
    createdAt: "2025-03-01",
  },
  {
    id: "gengar-battle-figure",
    title: "Gengar Battle Figure",
    slug: "gengar-battle-figure",
    category: "cosplay",
    description:
      "Stylized articulated Gengar collectible designed for anime collectors, gaming setups, and custom display environments.",
    shortDescription: "Articulated Gengar collectible for gaming displays",
    featuredImage: "/images/products/Gengar-1.jpg",
    galleryImages: ["/images/products/Gengar-2.jpg"],
    priceRange: "₹999",
    material: "PLA+",
    dimensions: "15cm × 12cm × 18cm",
    technologies: ["Multi-Part Character Printing"],
    featured: false,
    createdAt: "2025-03-10",
  },
  {
    id: "mewtwo-armor-figure",
    title: "Mewtwo Armor Figure",
    slug: "mewtwo-armor-figure",
    category: "cosplay",
    description:
      "Mechanical armor-inspired Mewtwo collectible featuring articulated detailing and precision printed structural components.",
    shortDescription: "Articulated armor Mewtwo collectible figure",
    featuredImage: "/images/products/Mew2-1.jpg",
    galleryImages: [
      "/images/products/Mew2-2.jpg",
      "/images/products/Mew2-3.jpg",
      "/images/products/Mew2-4.jpg",
    ],
    priceRange: "₹1,299",
    material: "PLA+",
    dimensions: "20cm × 15cm × 25cm",
    technologies: ["High Detail FDM Printing"],
    featured: true,
    createdAt: "2025-03-20",
  },
  {
    id: "pokemon-collection-set",
    title: "Pokémon Collection Set",
    slug: "pokemon-collection-set",
    category: "cosplay",
    description:
      "Multi-character Pokémon-inspired collectible set showcasing custom fan-art style production capability and display-ready finishing.",
    shortDescription: "Multi-character Pokémon-inspired collectible set",
    featuredImage: "/images/products/Pokemon-1.jpg",
    galleryImages: [],
    priceRange: "₹1,599",
    material: "PLA+",
    dimensions: "Set of 3 — 10cm each",
    technologies: ["Character Model Printing"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "engineering-prototype",
    title: "Engineering Prototype Component",
    slug: "engineering-prototype-component",
    category: "prototypes",
    description:
      "Complex engineering prototype demonstrating dimensional accuracy, multipart assembly capability, and precision mechanical detailing.",
    shortDescription: "Complex engineering prototype with precision detailing",
    featuredImage: "/images/products/CustomGun-1.jpg",
    galleryImages: [
      "/images/products/CustomGun-2.jpg",
      "/images/products/CustomGun-3.jpg",
    ],
    priceRange: "Custom Quote",
    material: "PLA+, Silk PLA",
    dimensions: "12cm × 8cm × 6cm",
    technologies: ["Functional Prototype Printing"],
    featured: true,
    createdAt: "2025-04-10",
  },
  {
    id: "gorilla-pen-holder",
    title: "Gorilla Pen Holder",
    slug: "gorilla-pen-holder",
    category: "custom",
    description:
      "Custom gorilla-themed desk organizer designed for utility-focused decor setups and creative workstation accessories.",
    shortDescription: "Custom gorilla-themed desk pen organizer",
    featuredImage: "/images/products/Penstand-1.jpg",
    galleryImages: ["/images/products/Kingkong-1.jpg"],
    priceRange: "₹599",
    material: "Matte PLA",
    dimensions: "12cm × 10cm × 14cm",
    technologies: ["Functional Decorative Printing"],
    featured: false,
    createdAt: "2025-04-15",
  },
  {
    id: "shiva-bulk-batch",
    title: "Bulk Shiva Production Batch",
    slug: "bulk-shiva-production-batch",
    category: "custom",
    description:
      "Batch production example demonstrating scalable manufacturing capability for custom product businesses, gifting brands, and resellers.",
    shortDescription: "Scalable batch production for resellers and brands",
    featuredImage: "/images/products/ShivaBulk.PNG",
    galleryImages: [],
    priceRange: "Bulk Pricing",
    material: "PLA+",
    dimensions: "Variable",
    technologies: ["Production Batch Printing"],
    featured: true,
    createdAt: "2025-04-20",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products
  return products.filter((p) => p.category === category)
}
