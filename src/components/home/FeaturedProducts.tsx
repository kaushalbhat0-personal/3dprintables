"use client"

import { useState } from "react"
import { getFeaturedProducts } from "@/data/products"
import { Section } from "@/components/ui/Section"
import { Heading } from "@/components/ui/Heading"
import { ProductCard } from "@/components/catalog/ProductCard"
import { ProductGallery } from "@/components/catalog/ProductGallery"
import type { Product } from "@/types"

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const featured = getFeaturedProducts()

  return (
    <>
      <Section id="featured-products" dark>
        <Heading
          title="Featured Creations"
          subtitle="A curated selection of our recent builds — from spiritual decor and cosplay collectibles to precision engineering prototypes and custom production runs."
        />

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={setSelectedProduct}
            />
          ))}
        </div>
      </Section>

      {selectedProduct && (
        <ProductGallery
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}
