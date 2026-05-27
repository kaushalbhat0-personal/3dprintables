import Image from "next/image"
import { Package, Truck, Sparkles, Zap } from "lucide-react"
import { Section } from "@/components/ui/Section"
import { Heading } from "@/components/ui/Heading"
import { Card } from "@/components/ui/Card"

const highlights = [
  {
    title: "Glow Resin Finish",
    category: "Spiritual Decor",
    note: "Intricate glow-in-the-dark resin panel with ethereal luminous effect",
    image: "/images/products/ShivaGlow.jpeg",
  },
  {
    title: "Precision Mechanical Prototype",
    category: "Prototypes & Engineering",
    note: "High-tolerance functional part with tight dimensional accuracy",
    image: "/images/products/prototype-part.png",
  },
  {
    title: "Custom Spiritual Decor",
    category: "Spiritual Decor",
    note: "Elegant matte-finished statue with crisp detailing and premium surface",
    image: "/images/products/ShivaWhite.jpeg",
  },
  {
    title: "Metallic Gold Sculpture",
    category: "Spiritual Decor",
    note: "Metallic-finish sculpture with intricate detailing and smooth lustre",
    image: "/images/products/ChromiumHanuman.jpg",
  },
]

const metrics = [
  { icon: Package, label: "Prints Completed", value: "500+" },
  { icon: Truck, label: "Pan-India Delivery", value: "All Cities" },
  { icon: Sparkles, label: "Print Technologies", value: "FDM & Resin" },
  { icon: Zap, label: "Turnaround", value: "24–48hrs" },
]

export function Testimonials() {
  return (
    <Section id="testimonials">
      <Heading
        title="Recent Work Highlights"
        subtitle="A look at what we've been printing — from spiritual decor to precision engineering."
      />

      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {highlights.map((item) => (
          <Card key={item.title} as="article" className="flex flex-col group">
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="inline-block px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground border border-border/50">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-5">
              <h3 className="text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed flex-1">
                {item.note}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {metrics.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-zinc-900/50 border border-border/50"
          >
            <stat.icon className="w-5 h-5 text-primary" />
            <span className="text-xl font-bold text-foreground">
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </Section>
  )
}
