import { cn } from "@/lib/utils"
import { Container } from "./Container"

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  id?: string
  dark?: boolean
}

export function Section({
  children,
  className,
  containerClassName,
  id,
  dark,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-20 lg:py-24",
        dark && "bg-surface bg-warm-glow",
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
