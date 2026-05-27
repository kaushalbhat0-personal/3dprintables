import { Building2, PaintBucket, ShoppingBag } from "lucide-react"
import { Section } from "@/components/ui/Section"
import { Heading } from "@/components/ui/Heading"

const audiences = [
  {
    icon: Building2,
    title: "For Creators",
    description:
      "Turn your digital models into physical reality. We handle the printing, finishing, and refinement — you focus on designing.",
    features: ["STL/OBJ/3MF file support", "Fast turnaround times", "Surface finishing included"],
  },
  {
    icon: ShoppingBag,
    title: "For Collectors",
    description:
      "Limited-edition statues, anime figures, and spiritual decor — all Made on Request with premium materials.",
    features: ["Single-piece production", "Custom sizing available", "Glow & metallic finishes"],
  },
  {
    icon: Building2,
    title: "For Brands",
    description:
      "Scale from prototype to full run. Consistent quality, volume pricing, and reliable lead times for decor brands and resellers.",
    features: ["Batch orders (10–500+ units)", "Consistent repeatability", "White-label ready"],
  },
  {
    icon: PaintBucket,
    title: "Custom Projects",
    description:
      "Have a unique idea? We offer end-to-end creation: design review, material selection, prototyping, and final production.",
    features: ["Design consultation", "Material sampling", "Iterative prototyping"],
  },
]

export function TrustSection() {
  return (
    <Section id="trust" dark className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <Heading
        title="Built for Creators, Collectors & Brands"
        subtitle="Whether you need a one-of-a-kind custom piece or a batch of 500, we have the craft and experience to deliver."
      />

      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {audiences.map((audience) => {
          const Icon = audience.icon
          return (
            <div
              key={audience.title}
              className="group relative rounded-2xl bg-zinc-900/50 border border-border p-6 md:p-8 hover:bg-zinc-800/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">
                    {audience.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {audience.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {audience.features.map((f) => (
                      <li
                        key={f}
                        className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium rounded-md bg-zinc-800 text-muted-foreground border border-border/50"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
