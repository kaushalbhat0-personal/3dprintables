"use client"

import { Palette, Sparkles, Moon, Gift, Brush } from "lucide-react"
import { SITE } from "@/lib/constants"
import { cn } from "@/lib/utils"

const finishes = [
  { icon: Brush, title: "Matte Finish", desc: "Smooth, non-reflective surface. Ideal for display pieces and photography." },
  { icon: Sparkles, title: "Metallic Coating", desc: "Gold, silver, or bronze metallic look. Premium gifting and decor." },
  { icon: Moon, title: "Glow-in-the-Dark", desc: "Glow PLA for ambient night illumination. Unique collectible effect." },
  { icon: Gift, title: "Gift-Ready Packaging", desc: "Every custom statue comes in secure, presentable packaging." },
]

export default function StatuesClient() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="container-main">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              <Palette className="w-3 h-3 mr-1.5" />
              Statues & Decor
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Custom Statues &amp;<br />
              <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">
                Home Decor
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed max-w-lg">
              Spiritual idols, custom busts, anime figures, and premium decor
              pieces. Made on request with premium materials and professional finishes.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-main">
          <h2 className="text-xl font-semibold text-foreground mb-6">Finishing Options</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {finishes.map((f) => {
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

          <div className="mt-12 rounded-2xl bg-zinc-900/50 border border-border p-8 md:p-10 text-center max-w-xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground">Have a Design in Mind?</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Send us a reference image, sketch, or 3D file. We&apos;ll review,
              quote, and deliver.
            </p>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi! I'd like to discuss a custom statue or decor project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2.5 h-13 px-8 text-base font-medium rounded-xl mt-6",
                "bg-primary text-primary-foreground hover:bg-primary-hover",
                "shadow-lg shadow-primary/25 transition-all duration-200"
              )}
            >
              Share Your Idea
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
