import { generateMetadata } from "@/lib/seo"
import { CatalogClient } from "@/components/catalog/CatalogClient"

export const metadata = generateMetadata({
  title: "Catalog — Browse 3D Printed Products",
  description:
    "Explore our collection of premium 3D printed products. From home decor to custom prototypes — find your next print.",
  path: "/catalog",
})

export default function CatalogPage() {
  return <CatalogClient />
}
