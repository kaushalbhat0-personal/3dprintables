import { Hexagon, Shield, Sparkles, Zap } from "lucide-react"
import { Section } from "@/components/ui/Section"
import { Heading } from "@/components/ui/Heading"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

interface Property {
  label: string
  value: number
}

interface Material {
  icon: typeof Hexagon
  name: string
  tagline: string
  description: string
  properties: Property[]
  useCases: string[]
}

const materials: Material[] = [
  {
    icon: Hexagon,
    name: "PLA+",
    tagline: "Everyday Precision",
    description:
      "Our go-to material for decorative pieces and prototypes. Easy to print with a matte finish and excellent dimensional accuracy.",
    properties: [
      { label: "Strength", value: 3 },
      { label: "Durability", value: 2 },
      { label: "Detail", value: 4 },
      { label: "Ease of Print", value: 5 },
    ],
    useCases: ["Home Decor", "Prototypes", "Gifts", "Toys"],
  },
  {
    icon: Shield,
    name: "PETG",
    tagline: "Functional Strength",
    description:
      "Stronger and more durable than PLA with better temperature and impact resistance. Ideal for functional parts that need to last.",
    properties: [
      { label: "Strength", value: 4 },
      { label: "Durability", value: 4 },
      { label: "UV Resistance", value: 4 },
      { label: "Flexibility", value: 3 },
    ],
    useCases: ["Brackets", "Enclosures", "Outdoor", "Tools"],
  },
  {
    icon: Sparkles,
    name: "Resin",
    tagline: "Ultra-Fine Detail",
    description:
      "Photopolymer resin delivers smooth, high-resolution prints with incredible surface detail. Perfect for miniatures and jewelry.",
    properties: [
      { label: "Detail", value: 5 },
      { label: "Smoothness", value: 5 },
      { label: "Strength", value: 2 },
      { label: "Brittleness", value: 3 },
    ],
    useCases: ["Miniatures", "Jewelry", "Cosplay", "Art"],
  },
  {
    icon: Zap,
    name: "TPU",
    tagline: "Flexible & Tough",
    description:
      "A flexible filament that bends and compresses without breaking. Great for wearable items, gaskets, and shock-absorbing parts.",
    properties: [
      { label: "Flexibility", value: 5 },
      { label: "Durability", value: 4 },
      { label: "Strength", value: 3 },
      { label: "Print Speed", value: 2 },
    ],
    useCases: ["Phone Cases", "Seals", "Wearables", "Bumpers"],
  },
]

function PropertyBar({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 w-4 rounded-full transition-colors duration-200",
            i < value ? "bg-primary" : "bg-zinc-700"
          )}
        />
      ))}
    </div>
  )
}

export function Materials() {
  return (
    <Section id="materials" dark>
      <Heading
        title="Materials We Work With"
        subtitle="We use industry-grade materials from trusted suppliers. Each material is chosen for its specific strengths and applications."
      />

      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {materials.map((material) => (
          <Card
            key={material.name}
            as="article"
            className="flex flex-col p-6 md:p-7"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                <material.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {material.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {material.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-muted leading-relaxed">
              {material.description}
            </p>

            <div className="mt-5 pt-5 border-t border-border space-y-2.5">
              {material.properties.map((prop) => (
                <div
                  key={prop.label}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-xs text-muted-foreground shrink-0">
                    {prop.label}
                  </span>
                  <PropertyBar value={prop.value} />
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2.5">
                Best for:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {material.useCases.map((use) => (
                  <span
                    key={use}
                    className="inline-block px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full bg-zinc-800 text-muted-foreground border border-border/50"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
