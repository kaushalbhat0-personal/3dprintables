import { Lightbulb, PenTool, Printer, Palette, Truck } from "lucide-react"
import { Section } from "@/components/ui/Section"
import { Heading } from "@/components/ui/Heading"

const steps = [
  {
    icon: Lightbulb,
    title: "Idea",
    description: "Share your concept — a sketch, photo, reference, or just a thought. Nothing is too vague.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "We model, optimize, and prepare your design for printing. We'll share previews for your feedback.",
  },
  {
    icon: Printer,
    title: "Print",
    description: "Your creation comes to life layer by layer. We use calibrated machines and premium materials.",
  },
  {
    icon: Palette,
    title: "Finish",
    description: "Post-processing, sanding, coating — we give every print a refined, professional surface finish.",
  },
  {
    icon: Truck,
    title: "Deliver",
    description: "Securely packed and shipped to your doorstep across India. Tracked delivery with care.",
  },
]

export function Process() {
  return (
    <Section id="process">
      <Heading
        title="How It Works"
        subtitle="From your idea to your doorstep — a simple five-step process designed for clarity and quality."
      />

      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
        {steps.map((step, index) => (
          <div key={step.title} className="relative text-center group">
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-4 transition-colors duration-200 group-hover:bg-primary/20">
                <step.icon className="w-6 h-6 text-primary" />
              </div>

              <span className="text-[10px] font-bold tracking-widest uppercase text-primary mb-1.5">
                Step {index + 1}
              </span>

              <h3 className="text-sm font-semibold text-foreground">
                {step.title}
              </h3>

              <p className="mt-2 text-xs text-muted leading-relaxed max-w-[220px]">
                {step.description}
              </p>
            </div>

            {index < steps.length - 1 && (
              <div
                className="hidden lg:block absolute top-7 left-[60%] w-[calc(100%-2rem)] h-px bg-gradient-to-r from-primary/40 to-transparent"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
