import type { Product } from "@/types"

export const products: Product[] = [
  {
    id: "hanuman-gold",
    title: "Golden Hanuman Statue",
    slug: "golden-hanuman-statue",
    category: "spiritual-decor",
    description:
      "Premium metallic-finish Hanuman sculpture with intricate detailing and smooth finishing. A striking centrepiece for spiritual spaces.",
    shortDescription: "Premium metallic-finish Hanuman sculpture",
    image: "/images/products/ChromiumHanuman.jpg",
    priceRange: "₹799",
    material: "PLA+",
    dimensions: "18cm × 12cm × 25cm",
    technologies: ["FDM"],
    featured: true,
    createdAt: "2025-01-15",
  },
  {
    id: "shiva-white",
    title: "Shiva Meditation Statue",
    slug: "shiva-meditation-statue",
    category: "spiritual-decor",
    description:
      "High-detail Shiva meditation statue crafted with premium resin printing for clean finishes and fine detailing on the crown and ornaments.",
    shortDescription: "High-detail resin Shiva meditation statue",
    image: "/images/products/ShivaWhite.jpeg",
    priceRange: "₹699",
    material: "Resin",
    dimensions: "15cm × 10cm × 22cm",
    technologies: ["SLA"],
    featured: true,
    createdAt: "2025-02-01",
  },
  {
    id: "shiva-glow",
    title: "Glow-in-the-Dark Shiva Print",
    slug: "glow-shiva-print",
    category: "spiritual-decor",
    description:
      "Glow resin Shiva sculpture designed for ambient decor and spiritual spaces. Charges under light and emits a soft ethereal glow.",
    shortDescription: "Glow resin Shiva for ambient spiritual decor",
    image: "/images/products/ShivaGlow.jpeg",
    priceRange: "₹899",
    material: "PLA+ Glow Filament",
    dimensions: "20cm × 15cm × 2cm",
    technologies: ["FDM"],
    featured: true,
    createdAt: "2025-02-10",
  },
  {
    id: "shiva-bulk",
    title: "Bulk Shiva Production",
    slug: "bulk-shiva-production",
    category: "custom",
    description:
      "Bulk production capability for custom spiritual decor and event orders. Consistent quality control across every unit.",
    shortDescription: "Bulk production for spiritual decor orders",
    image: "/images/products/ShivaBulk.PNG",
    priceRange: "Bulk Pricing",
    material: "PLA+",
    dimensions: "Variable",
    technologies: ["FDM"],
    featured: true,
    createdAt: "2025-03-01",
  },
  {
    id: "ironman-mask",
    title: "Iron Man Mask",
    slug: "iron-man-mask",
    category: "cosplay",
    description:
      "Full-scale Iron Man cosplay mask printed and finished in-house. Premium post-processing with sanding, assembly, and surface finishing.",
    shortDescription: "Full-scale finished Iron Man cosplay mask",
    image: "/images/products/IronManMask.jpeg",
    priceRange: "₹1,499",
    material: "PLA+",
    dimensions: "28cm × 20cm × 15cm",
    technologies: ["FDM"],
    featured: true,
    createdAt: "2025-03-15",
  },
  {
    id: "ironman-mask-making",
    title: "Iron Man Mask Build Process",
    slug: "iron-man-mask-build-process",
    category: "cosplay",
    description:
      "Behind-the-scenes look at the fabrication and finishing process — from raw print to final assembly with precision craftsmanship.",
    shortDescription: "Mask fabrication and finishing process showcase",
    image: "/images/products/IronManMaskMaking.jpeg",
    priceRange: "Custom Project",
    material: "PLA+",
    dimensions: "Variable",
    technologies: ["FDM"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "prototype-part",
    title: "Precision Prototype Component",
    slug: "precision-prototype-component",
    category: "prototypes",
    description:
      "High-precision prototype component built for fitment testing, mechanical visualisation, and custom engineering applications.",
    shortDescription: "High-precision engineering prototype component",
    image: "/images/products/prototype-part.png",
    priceRange: "Custom Quote",
    material: "PLA Pro",
    dimensions: "8cm × 6cm × 4cm",
    technologies: ["FDM"],
    featured: true,
    createdAt: "2025-04-15",
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
