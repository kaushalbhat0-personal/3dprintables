import { Suspense } from "react"
import { getProducts } from "@/data/products"
import { generateMetadata } from "@/lib/seo"
import { CatalogClient } from "@/components/catalog/CatalogClient"

export const revalidate = 3600

export const metadata = generateMetadata({
  title: "Catalog — Browse Our Collection",
  description:
    "Explore our portfolio of 3D printed products — spiritual decor, cosplay collectibles, engineering prototypes, and custom manufacturing.",
  path: "/catalog",
})

export default async function CatalogPage() {
  const products = await getProducts()
  return (
    <Suspense fallback={null}>
      <CatalogClient products={products} />
    </Suspense>
  )
}
