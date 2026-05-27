import { generateMetadata } from "@/lib/seo"
import { AboutHero } from "@/components/about/AboutHero"
import { BrandStory } from "@/components/about/BrandStory"
import { Mission } from "@/components/about/Mission"
import { Process } from "@/components/about/Process"
import { Stats } from "@/components/about/Stats"
import { AboutCTA } from "@/components/about/AboutCTA"

export const metadata = generateMetadata({
  title: "About — Our 3D Printing Studio",
  description:
    "Learn the story behind 3D Factory. A production studio obsessed with precision, quality, and the craft of 3D printing.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <BrandStory />
      <Mission />
      <Process />
      <Stats />
      <AboutCTA />
    </>
  )
}
