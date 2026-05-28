import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
  style?: Record<string, string>
  hover?: boolean
  as?: "div" | "article" | "li"
  onClick?: () => void
}

export function Card({
  children,
  className,
  style,
  hover = true,
  as: Tag = "div",
  onClick,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl bg-card border border-border overflow-hidden select-none",
        hover && "transition-all duration-200 hover:bg-card-hover hover:border-zinc-600 hover:shadow-xl hover:shadow-zinc-950/30 active:scale-[0.99]",
        className
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </Tag>
  )
}
