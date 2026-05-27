"use client"

import Link from "next/link"
import { Wrench, Ghost, Palette, Package } from "lucide-react"
import { Section } from "@/components/ui/Section"

const services = [
  {
    icon: Wrench,
    title: "Prototyping",
    slug: "prototyping",
    description:
      "Functional prototypes, engineering components, mechanical assemblies, and iterative design validation. We work with your CAD files to deliver dimensionally accurate parts fast.",
    highlights: ["STL/OBJ/STEP/3MF", "2–5 day turnaround", "Iterative revisions", "Tolerance: ±0.2mm"],
  },
  {
    icon: Ghost,
    title: "Cosplay Props & Collectibles",
    slug: "cosplay-props",
    description:
      "Wearable masks, armor pieces, prop weapons, and character collectibles. Large-format printing, assembly, sanding, priming, and painting available.",
    highlights: ["Full-scale printing", "Wearable finishing", "Paint-ready primed", "Articulated joints"],
  },
  {
    icon: Palette,
    title: "Custom Statues & Decor",
    slug: "custom-statues",
    description:
      "Spiritual idols, custom busts, display statues, and home decor pieces. Premium materials with metallic, matte, or glow-in-the-dark finishes.",
    highlights: ["Spiritual & cultural", "Metallic coating", "Glow PLA option", "Gift-ready packaging"],
  },
  {
    icon: Package,
    title: "Bulk Production",
    slug: "bulk-production",
    description:
      "Scalable manufacturing for decor brands, resellers, and businesses. Consistent quality across batches with bulk pricing and scheduled delivery.",
    highlights: ["10–500+ units", "Consistent repeatability", "White-label ready", "Bulk pricing"],
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Services
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted max-w-lg mx-auto leading-relaxed">
              From single prototypes to production-scale manufacturing —
              we handle the entire 3D printing workflow in-house.
            </p>
          </div>
        </div>
      </section>

      <Section dark>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon
            return (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group rounded-2xl bg-zinc-900/50 border border-border p-6 md:p-8 hover:bg-zinc-800/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {svc.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {svc.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {svc.highlights.map((h) => (
                        <li
                          key={h}
                          className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium rounded-md bg-zinc-800 text-muted-foreground border border-border/50"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </Section>
    </>
  )
}
