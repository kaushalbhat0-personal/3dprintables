import { Wrench, Ruler, RotateCw, Cpu, Layers } from "lucide-react"
import { SITE } from "@/lib/constants"
import { cn } from "@/lib/utils"

const steps = [
  { icon: Ruler, title: "Share Your Design", desc: "Send us your STL, OBJ, STEP, or 3MF file. Not sure about the format? We'll guide you." },
  { icon: Cpu, title: "Design Review", desc: "We check for printability, wall thickness, overhangs, and suggest optimizations — free of charge." },
  { icon: Layers, title: "Print & Finish", desc: "We print with your choice of material, then sand, prime, and finish to your specifications." },
  { icon: RotateCw, title: "Iterate", desc: "Need revisions? We offer up to 3 design iterations per prototype. Tweak and re-print fast." },
]

const specs = [
  { label: "Technology", value: "FDM (Fused Deposition Modeling)" },
  { label: "Layer Height", value: "0.12mm – 0.28mm" },
  { label: "Dimensional Accuracy", value: "±0.2mm (typical)" },
  { label: "Max Build Volume", value: "220mm × 220mm × 250mm" },
  { label: "Materials", value: "PLA+, Matte PLA, Silk PLA, Glow PLA" },
  { label: "Lead Time", value: "2–5 business days (single prototype)" },
  { label: "File Formats", value: "STL, OBJ, STEP, 3MF, FBX" },
]

export default function PrototypingClient() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="container-main">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              <Wrench className="w-3 h-3 mr-1.5" />
              Prototyping Service
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Functional Prototypes &amp;<br />
              <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">
                Engineering Parts
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed max-w-lg">
              From concept to physical part in days. We work with engineers,
              designers, and makers to produce functional prototypes,
              mechanical components, and test fixtures.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-foreground">How It Works</h2>
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="flex items-start gap-4">
                    <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary text-sm font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="mt-1 text-sm text-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="rounded-2xl bg-zinc-900/50 border border-border p-6 md:p-8">
              <h2 className="text-lg font-semibold text-foreground mb-5">Specifications</h2>
              <div className="space-y-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-start justify-between gap-4 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                    <span className="text-sm text-muted-foreground shrink-0">{spec.label}</span>
                    <span className="text-sm text-foreground font-medium text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi! I'd like to discuss a prototyping project.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-2.5 w-full h-13 mt-6 text-base font-medium rounded-xl",
                  "bg-primary text-primary-foreground hover:bg-primary-hover",
                  "shadow-lg shadow-primary/25 transition-all duration-200"
                )}
              >
                Start Your Prototype
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
