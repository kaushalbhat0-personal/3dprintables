import { Package, BarChart3, Truck, ShieldCheck } from "lucide-react"
import { SITE } from "@/lib/constants"
import { cn } from "@/lib/utils"

const benefits = [
  { icon: BarChart3, title: "Consistent Quality", desc: "Every piece matches the first. We calibrate and profile for repeatable, reliable results batch after batch." },
  { icon: Package, title: "White-Label Ready", desc: "Unbranded packaging and clean finishing. Your brand, our craftsmanship." },
  { icon: Truck, title: "Scheduled Delivery", desc: "We plan production around your timeline. No rush fees, just dependable lead times." },
  { icon: ShieldCheck, title: "Volume Pricing", desc: "Discounted per-unit pricing from 10 pieces. The more you order, the better the value." },
]

const steps = [
  { num: "01", title: "Submit Your Design", desc: "Share your 3D file or reference images. We'll review and prepare your design for printing." },
  { num: "02", title: "Get Your Quote", desc: "We calculate per-piece cost based on volume, material, finish, and complexity." },
  { num: "03", title: "Sample Approval", desc: "We print and ship a sample for your approval before full production begins." },
  { num: "04", title: "Full Production", desc: "Batch printing with quality checks at every stage. Consistent results, delivered on schedule." },
]

export default function BulkClient() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="container-main">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              <Package className="w-3 h-3 mr-1.5" />
              Bulk Production
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Custom Creations<br />
              <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">
                at Scale
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed max-w-lg">
              From a single custom piece to 500+ units. Consistent quality,
              competitive volume pricing, and reliable lead times for decor
              brands, resellers, and creators.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon
              return (
                <div key={b.title} className="rounded-2xl bg-zinc-900/50 border border-border p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <Icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{b.title}</h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-main">
          <h2 className="text-xl font-semibold text-foreground mb-6">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="rounded-2xl bg-zinc-900/50 border border-border p-6 md:p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg font-bold mx-auto">
                  {s.num}
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi! I'd like to discuss a bulk production order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2.5 h-13 px-8 text-base font-medium rounded-xl",
                "bg-primary text-primary-foreground hover:bg-primary-hover",
                "shadow-lg shadow-primary/25 transition-all duration-200"
              )}
            >
              Get Your Volume Quote
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
