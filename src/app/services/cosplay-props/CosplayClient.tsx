"use client"

import { Ghost, Scan, Paintbrush, ArmchairIcon, ShieldCheck } from "lucide-react"
import { SITE } from "@/lib/constants"
import { cn } from "@/lib/utils"

const features = [
  { icon: Scan, title: "Full-Scale Printing", desc: "We print at actual size — whether it's a wearable Iron Man mask or a life-sized prop." },
  { icon: Paintbrush, title: "Sanding & Priming", desc: "Every cosplay piece is sanded smooth and primed, ready for your final paint job." },
  { icon: ArmchairIcon, title: "Wearable Finishing", desc: "Straps, hinges, visors, and padding — we make props convention-ready." },
  { icon: ShieldCheck, title: "Durable Materials", desc: "PLA+ with reinforced walls ensures your prop survives travel, wear, and display." },
]

const gallery = [
  { title: "Iron Man Mask", image: "/images/products/IronManMask.jpeg" },
  { title: "Mewtwo Armor", image: "/images/products/Mew2-1.jpg" },
  { title: "Gengar Figure", image: "/images/products/Gengar-1.jpg" },
  { title: "Pokémon Set", image: "/images/products/Pokemon-1.jpg" },
]

export default function CosplayClient() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="container-main">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              <Ghost className="w-3 h-3 mr-1.5" />
              Cosplay Service
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Cosplay Props &amp;<br />
              <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">
                Collectible Figures
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed max-w-lg">
              Wearable masks, armor pieces, prop weapons, and display collectibles.
              We print, sand, and finish — you wear or display.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="rounded-2xl bg-zinc-900/50 border border-border p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <Icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-main">
          <h2 className="text-xl font-semibold text-foreground mb-6">Recent Cosplay Builds</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <div
                key={item.title}
                className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-800 border border-border"
              >
                <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground/60">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi! I'd like to discuss a cosplay prop project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2.5 h-13 px-8 text-base font-medium rounded-xl",
                "bg-primary text-primary-foreground hover:bg-primary-hover",
                "shadow-lg shadow-primary/25 transition-all duration-200"
              )}
            >
              Discuss Your Cosplay Project
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
