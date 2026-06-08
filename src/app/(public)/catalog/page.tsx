import { Suspense } from "react"
import { getProducts } from "@/data/products"
import { generateMetadata } from "@/lib/seo"
import { CatalogClient } from "@/components/catalog/CatalogClient"
import CatalogLoading from "./loading"

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
  const { category } = await searchParams
  return (
    <Suspense fallback={<CatalogLoading />}>
      <CatalogContent category={category ?? null} />
    </Suspense>
  )
}

async function CatalogContent({ category }: { category: string | null }) {
  const products = await getProducts()
  return <CatalogClient products={products} initialCategory={category} />
}
