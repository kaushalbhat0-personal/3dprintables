import { Star } from "lucide-react"
import { testimonials } from "@/data/testimonials"
import { Section } from "@/components/ui/Section"
import { Heading } from "@/components/ui/Heading"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const avatarGradients = [
  "from-amber-600 to-amber-800",
  "from-zinc-500 to-zinc-700",
  "from-rose-600 to-rose-800",
  "from-emerald-600 to-emerald-800",
  "from-sky-600 to-sky-800",
  "from-violet-600 to-violet-800",
]

export function Testimonials() {
  return (
    <Section id="testimonials">
      <Heading
        title="What Our Customers Say"
        subtitle="Real feedback from real customers. We let our work and their words speak for themselves."
      />

      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <Card key={t.id} as="article" className="flex flex-col p-6 md:p-7">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br text-xs font-bold text-white shrink-0",
                  avatarGradients[i % avatarGradients.length]
                )}
              >
                {getInitials(t.name)}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {t.name}
                </p>
                {t.handle && (
                  <p className="text-xs text-muted-foreground truncate">
                    {t.handle}
                  </p>
                )}
              </div>
            </div>

            <div className="relative flex-1">
              <span
                className="absolute -top-1 -left-0.5 text-4xl leading-none text-primary/15 select-none pointer-events-none font-serif"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="text-sm text-muted leading-relaxed pl-4 relative z-10">
                {t.content}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={cn(
                      "w-3.5 h-3.5",
                      idx < t.rating
                        ? "fill-primary text-primary"
                        : "fill-none text-zinc-700"
                    )}
                  />
                ))}
              </div>

              {t.product && (
                <span className="text-[10px] font-medium tracking-wider uppercase text-muted-foreground shrink-0">
                  {t.product}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
