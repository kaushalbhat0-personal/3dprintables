import type { Metadata } from "next"

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
  const url = path ? `https://printcraft.in${path}` : "https://printcraft.in"

  return {
    title: `${title} | PrintCraft`,
    description,
    openGraph: {
      title: `${title} | PrintCraft`,
      description,
      url,
      siteName: "PrintCraft",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | PrintCraft`,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}
