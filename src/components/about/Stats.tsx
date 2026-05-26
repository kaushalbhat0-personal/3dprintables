import { Layers, Users, Package, MapPin, Clock } from "lucide-react"
import { Container } from "@/components/ui/Container"

const stats = [
  { icon: Layers, value: "2,500+", label: "Prints Completed" },
  { icon: Users, value: "500+", label: "Happy Customers" },
  { icon: Package, value: "6+", label: "Material Options" },
  { icon: Clock, value: "24-48hr", label: "Typical Turnaround" },
  { icon: MapPin, value: "50+", label: "Cities Delivered" },
]

export function Stats() {
  return (
    <section className="py-16 md:py-20 border-y border-border bg-zinc-900/50">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <stat.icon className="w-5 h-5 text-primary" />
              <span className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
