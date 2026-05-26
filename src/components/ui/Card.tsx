import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  as?: "div" | "article" | "li"
}

export function Card({
  children,
  className,
  hover = true,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl bg-card border border-border overflow-hidden",
        hover && "transition-all duration-300 hover:bg-card-hover hover:border-zinc-600 hover:shadow-xl hover:shadow-black/20",
        className
      )}
    >
      {children}
    </Tag>
  )
}
