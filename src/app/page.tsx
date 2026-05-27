import { generateMetadata } from "@/lib/seo"
import { Hero } from "@/components/home/Hero"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { WhyChooseUs } from "@/components/home/WhyChooseUs"
import { Materials } from "@/components/home/Materials"
import { Testimonials } from "@/components/home/Testimonials"
import { FAQ } from "@/components/home/FAQ"
import { InstagramTrust } from "@/components/home/InstagramTrust"
import { CTABanner } from "@/components/home/CTABanner"

export const metadata = generateMetadata({
  title: "Premium 3D Printing Studio — Custom Manufacturing & Prototyping",
  description:
    "India's production-grade 3D printing studio. Spiritual decor, cosplay collectibles, engineering prototypes, and custom manufacturing. Order via WhatsApp.",
  path: "/",
})

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <Materials />
      <Testimonials />
      <FAQ />
      <InstagramTrust />
      <CTABanner />
    </>
  )
}
