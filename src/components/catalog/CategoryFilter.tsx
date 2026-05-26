"use client"

import { cn } from "@/lib/utils"
import { PRODUCT_CATEGORIES } from "@/types"

interface CategoryFilterProps {
  active: string
  onChange: (category: string) => void
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const categories = [
    { value: "all", label: "All" },
    ...PRODUCT_CATEGORIES,
  ]

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            "shrink-0 px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200 cursor-pointer select-none",
            active === cat.value
              ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
              : "bg-card text-muted-foreground border-border hover:bg-card-hover hover:text-foreground hover:border-zinc-600"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
