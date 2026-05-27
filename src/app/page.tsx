import { getFeaturedProducts } from "@/data/products"
import { generateMetadata } from "@/lib/seo"
import { Hero } from "@/components/home/Hero"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { WhyChooseUs } from "@/components/home/WhyChooseUs"
import { Materials } from "@/components/home/Materials"
import { Testimonials } from "@/components/home/Testimonials"
import { FAQ } from "@/components/home/FAQ"
import { InstagramTrust } from "@/components/home/InstagramTrust"
import { TrustSection } from "@/components/home/TrustSection"
import { CTABanner } from "@/components/home/CTABanner"

export const dynamic = "force-dynamic"

export const metadata = generateMetadata({
  title: "Premium 3D Printing Studio — Custom Manufacturing & Prototyping",
  description:
    "India's production-grade 3D printing studio. Spiritual decor, cosplay collectibles, engineering prototypes, and custom manufacturing. Order via WhatsApp.",
  path: "/",
})

export default async function Home() {
  const featured = await getFeaturedProducts()
  return (
    <>
      <Hero />
      <FeaturedProducts featured={featured} />
      <WhyChooseUs />
      <Materials />
      <Testimonials />
      <TrustSection />
      <FAQ />
      <InstagramTrust />
      <CTABanner />
    </>
  )
}
