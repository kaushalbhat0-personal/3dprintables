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
  const url = path ? `https://3dfactory.in${path}` : "https://3dfactory.in"

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
