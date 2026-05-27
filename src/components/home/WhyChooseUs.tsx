import {
  Crosshair,
  Layers,
  PenTool,
  Repeat,
  Scan,
  Headphones,
} from "lucide-react"
import { Section } from "@/components/ui/Section"
import { Heading } from "@/components/ui/Heading"
import { Card } from "@/components/ui/Card"

const features = [
  {
    icon: Crosshair,
    title: "High-Detail Precision",
    description:
      "Calibrated FDM and resin printing with tight tolerances. Every layer is optimised for dimensional accuracy and clean surface finish — from tiny collectibles to large decor pieces.",
  },
  {
    icon: Layers,
    title: "Scalable Batch Production",
    description:
      "Consistent repeatability across production runs. We maintain strict quality control whether you need one prototype or a bulk order of 200 units for your brand.",
  },
  {
    icon: PenTool,
    title: "Custom Design Support",
    description:
      "Send us your sketches, reference images, or CAD files. Our team handles modelling, optimisation, and preparation for print — no design experience needed.",
  },
  {
    icon: Repeat,
    title: "Fast Iteration Cycles",
    description:
      "From concept to physical part in as little as 24 hours. Quick turnaround on design revisions, fitment checks, and prototype validation for product development.",
  },
  {
    icon: Scan,
    title: "Premium Finishing",
    description:
      "Every print receives professional post-processing — sanding, priming, coating, and assembly. We deliver pieces that look manufactured, not just printed.",
  },
  {
    icon: Headphones,
    title: "Dedicated Project Support",
    description:
      "A single point of contact from quote to delivery. Real-time updates, material recommendations, and transparent communication throughout your project.",
  },
]

export function WhyChooseUs() {
  return (
    <Section id="why-choose-us">
      <Heading
        title="Built for Creators and Brands"
        subtitle="We operate a production-grade studio with a focus on precision, repeatability, and clean finishing — from single prototypes to bulk manufacturing."
      />

      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature) => (
          <Card key={feature.title} as="article" className="p-6 md:p-8">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 mb-5">
              <feature.icon className="w-5 h-5 text-primary" />
            </div>

            <h3 className="text-base font-semibold text-foreground">
              {feature.title}
            </h3>

            <p className="mt-2 text-sm text-muted leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
