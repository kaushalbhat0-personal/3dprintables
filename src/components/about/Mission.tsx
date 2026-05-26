import { Sparkles, Shield, PenTool, Lightbulb } from "lucide-react"
import { Section } from "@/components/ui/Section"
import { Heading } from "@/components/ui/Heading"
import { Card } from "@/components/ui/Card"

const values = [
  {
    icon: Sparkles,
    title: "Quality First",
    description:
      "We never rush a print. Every layer is calibrated, every support tuned, every finish inspected before it leaves our studio.",
  },
  {
    icon: Lightbulb,
    title: "Creativity Driven",
    description:
      "Your idea is the starting point. We help refine, optimize, and enhance designs to make them printable without losing your vision.",
  },
  {
    icon: Shield,
    title: "Radically Transparent",
    description:
      "We show you exactly what to expect — material options, timelines, pricing, and progress updates. No surprises, no fine print.",
  },
  {
    icon: PenTool,
    title: "Built for You",
    description:
      "Every order is treated as a custom project. Whether it's one piece or a hundred, we give it the same attention to detail.",
  },
]

export function Mission() {
  return (
    <Section dark>
      <Heading
        title="What We Believe In"
        subtitle="Four principles that guide every print we make and every customer we work with."
      />

      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {values.map((value) => (
          <Card key={value.title} as="article" className="p-6 md:p-8">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 mb-5">
              <value.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              {value.title}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {value.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
