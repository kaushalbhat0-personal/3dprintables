import { getFeaturedProducts } from "@/data/products"
import { Section } from "@/components/ui/Section"
import { Heading } from "@/components/ui/Heading"
import { ProductCard } from "@/components/catalog/ProductCard"

export function FeaturedProducts() {
  const featured = getFeaturedProducts()

  return (
    <Section id="featured-products" dark>
      <Heading
        title="Featured Creations"
        subtitle="Every piece is crafted with precision and care. Explore our most popular designs — from elegant decor to functional gadgets."
      />

      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </Section>
  )
}
