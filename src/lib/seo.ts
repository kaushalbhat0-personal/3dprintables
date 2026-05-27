import type { Metadata } from "next"
import { siteUrl } from "@/lib/url"

interface SEOProps {
  title: string
  description: string
  path?: string
}

export function generateMetadata({
  title,
  description,
  path,
}: SEOProps): Metadata {
  const url = siteUrl(path)

  return {
    title,
    description,
    openGraph: {
      title: `${title} | 3D Factory`,
      description,
      url,
      siteName: "3D Factory",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | 3D Factory`,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}
