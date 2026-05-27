import type { MetadataRoute } from "next"
import { getProducts } from "@/data/products"
import { siteUrl } from "@/lib/url"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl(), lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: siteUrl("/catalog"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: siteUrl("/services"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: siteUrl("/services/prototyping"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: siteUrl("/services/cosplay-props"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: siteUrl("/services/custom-statues"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: siteUrl("/services/bulk-production"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: siteUrl("/contact"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: siteUrl("/about"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: siteUrl(`/catalog/${product.slug}`),
    lastModified: new Date(product.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}
