import { Section } from "@/components/ui/Section"
import { Heading } from "@/components/ui/Heading"
import { ProductCard } from "@/components/catalog/ProductCard"
import type { Product } from "@/types"

export function FeaturedProducts({ featured }: { featured: Product[] }) {
  return (
    <Section id="featured-products" dark>
      <Heading
        title="Featured Creations"
        subtitle="A curated selection of our recent builds — from spiritual decor and cosplay collectibles to precision engineering prototypes and custom production runs."
      />

      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  )
}
