import { generateMetadata } from "@/lib/seo"
import { CatalogClient } from "@/components/catalog/CatalogClient"

export const metadata = generateMetadata({
  title: "Catalog — Browse Our Collection",
  description:
    "Explore our portfolio of 3D printed products — spiritual decor, cosplay collectibles, engineering prototypes, and custom manufacturing.",
  path: "/catalog",
})

export default function CatalogPage() {
  return <CatalogClient />
}
