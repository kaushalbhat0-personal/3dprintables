import {
  Crosshair,
  Zap,
  Layers,
  PenTool,
  Truck,
  Headphones,
} from "lucide-react"
import { Section } from "@/components/ui/Section"
import { Heading } from "@/components/ui/Heading"
import { Card } from "@/components/ui/Card"

const features = [
  {
    icon: Crosshair,
    title: "Precision Printing",
    description:
      "High-tolerance FDM & SLA printing with rigorous quality checks. Every layer is optimized for strength and surface finish.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Most orders dispatched within 24–48 hours. Need it faster? Rush orders are always available — just ask.",
  },
  {
    icon: Layers,
    title: "Premium Materials",
    description:
      "PLA+, PETG, TPU, and engineering resins from trusted suppliers. Each spool is stored and dried to strict standards.",
  },
  {
    icon: PenTool,
    title: "Fully Custom Orders",
    description:
      "Send us your sketches, photos, or CAD files. We handle design, slicing, and printing — you get exactly what you envisioned.",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description:
      "Free shipping on orders above ₹999. Secure, trackable packaging delivered to your doorstep across all major cities.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "A personal design consultant assigned to every order. From concept to delivery, one point of contact throughout.",
  },
]

export function WhyChooseUs() {
  return (
    <Section id="why-choose-us">
      <Heading
        title="Why Choose Us"
        subtitle="We treat every print as a craft. Here's what sets us apart from the rest."
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
