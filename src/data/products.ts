import type { Product } from "@/types"

export const products: Product[] = [
  {
    id: "1",
    title: "Geometric Vase",
    slug: "geometric-vase",
    category: "decor",
    description:
      "A stunning geometric vase designed with precision. Perfect for modern interiors with clean lines and a premium matte finish.",
    shortDescription: "Modern geometric vase with premium matte finish",
    image: "/images/products/geometric-vase.jpg",
    priceRange: "₹499 – ₹899",
    material: "PLA+",
    dimensions: "15cm × 15cm × 20cm",
    technologies: ["FDM"],
    featured: true,
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    title: "Phone Stand Pro",
    slug: "phone-stand-pro",
    category: "gadgets",
    description:
      "Ergonomic phone stand with cable management. Compatible with all phone sizes. Adjustable viewing angle.",
    shortDescription: "Ergonomic phone stand with cable management",
    image: "/images/products/phone-stand.jpg",
    priceRange: "₹299 – ₹499",
    material: "PETG",
    dimensions: "8cm × 6cm × 12cm",
    technologies: ["FDM"],
    featured: true,
    createdAt: "2025-02-01",
  },
  {
    id: "3",
    title: "Dragon Bust",
    slug: "dragon-bust",
    category: "cosplay",
    description:
      "Highly detailed dragon bust for display or cosplay. Multi-part assembly with incredible surface detail.",
    shortDescription: "Detailed dragon bust for display or cosplay",
    image: "/images/products/dragon-bust.jpg",
    priceRange: "₹999 – ₹2,499",
    material: "Resin",
    dimensions: "20cm × 15cm × 25cm",
    technologies: ["SLA"],
    featured: true,
    createdAt: "2025-02-10",
  },
  {
    id: "4",
    title: "Modular Shelf Bracket",
    slug: "modular-shelf-bracket",
    category: "home",
    description:
      "Heavy-duty modular shelf brackets. Easy to install, supports up to 15kg per bracket. Custom colors available.",
    shortDescription: "Heavy-duty modular shelf brackets, 15kg capacity",
    image: "/images/products/shelf-bracket.jpg",
    priceRange: "₹199 – ₹399",
    material: "PETG",
    dimensions: "10cm × 5cm × 4cm",
    technologies: ["FDM"],
    featured: false,
    createdAt: "2025-03-01",
  },
  {
    id: "5",
    title: "Minimalist Ring",
    slug: "minimalist-ring",
    category: "jewelry",
    description:
      "Elegant minimalist ring with smooth finish. Hypoallergenic, lightweight, and available in multiple colors.",
    shortDescription: "Elegant minimalist ring, hypoallergenic",
    image: "/images/products/minimalist-ring.jpg",
    priceRange: "₹149 – ₹299",
    material: "Resin",
    dimensions: "Adjustable",
    technologies: ["SLA"],
    featured: true,
    createdAt: "2025-03-15",
  },
  {
    id: "6",
    title: "Articulated Octopus",
    slug: "articulated-octopus",
    category: "toys",
    description:
      "Fully articulated octopus toy with posable tentacles. A fun print that showcases the magic of 3D printing.",
    shortDescription: "Posable articulated octopus toy",
    image: "/images/products/articulated-octopus.jpg",
    priceRange: "₹349 – ₹599",
    material: "PLA",
    dimensions: "12cm × 8cm × 5cm",
    technologies: ["FDM"],
    featured: false,
    createdAt: "2025-04-01",
  },
  {
    id: "7",
    title: "Custom Bust Sculpture",
    slug: "custom-bust-sculpture",
    category: "custom",
    description:
      "Bespoke 3D printed bust from your photos. Perfect for gifts, memorials, or personal displays.",
    shortDescription: "Bespoke bust sculpture from your photos",
    image: "/images/products/custom-bust.jpg",
    priceRange: "₹1,999 – ₹4,999",
    material: "Resin",
    dimensions: "Custom",
    technologies: ["SLA", "Photogrammetry"],
    featured: true,
    createdAt: "2025-04-10",
  },
  {
    id: "8",
    title: "Functional Gear Set",
    slug: "functional-gear-set",
    category: "prototypes",
    description:
      "Precision-engineered gear set for prototyping. Tight tolerances, smooth meshing, ready for your project.",
    shortDescription: "Precision gear set for prototyping",
    image: "/images/products/gear-set.jpg",
    priceRange: "₹249 – ₹699",
    material: "PLA Pro",
    dimensions: "5cm × 5cm × 3cm",
    technologies: ["FDM"],
    featured: false,
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
