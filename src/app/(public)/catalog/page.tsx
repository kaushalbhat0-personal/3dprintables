import { Suspense } from "react"
import { getProducts } from "@/data/products"
import { generateMetadata } from "@/lib/seo"
import { CatalogClient } from "@/components/catalog/CatalogClient"

export const metadata = generateMetadata({
  title: "Catalog — Browse Our Collection",
  description:
    "Explore our portfolio of custom 3D creations — spiritual decor, cosplay collectibles, engineering prototypes, and personalized gifts.",
  path: "/catalog",
})

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const products = await getProducts()
  const { category } = await searchParams
  return (
    <Suspense fallback={null}>
      <CatalogClient products={products} initialCategory={category ?? null} />
    </Suspense>
  )
}
