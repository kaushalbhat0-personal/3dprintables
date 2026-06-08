"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav"
import { cn } from "@/lib/utils"

export function AdminMobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 lg:hidden bg-surface/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-1 px-3 py-2 overflow-x-auto scrollbar-none">
        {ADMIN_NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 h-10 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap shrink-0 border",
                isActive
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-zinc-800 border-transparent"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
