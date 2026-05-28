"use client"

import { useState, useEffect, useRef, startTransition } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, MessageSquare, Star, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import { lockBodyScroll, unlockBodyScroll } from "@/lib/ui/scroll-lock"

const NAV_ITEMS = [
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
]

export function AdminSidebar({ email, signOutForm }: { email: string; signOutForm: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (open) {
      lockBodyScroll()
    } else {
      unlockBodyScroll()
    }
    return () => { if (open) unlockBodyScroll() }
  }, [open])

  const prevPathname = useRef(pathname)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname
      startTransition(() => setOpen(false))
    }
  }, [pathname])

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 h-16 border-b border-border shrink-0">
        <Link href="/admin/products" className="text-base font-bold tracking-tight text-foreground">
          Dashboard
        </Link>
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-zinc-800 active:scale-90 transition-all duration-200"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="px-5 py-3 border-b border-border shrink-0">
        <p className="text-[11px] text-muted-foreground">Signed in as</p>
        <p className="text-sm text-foreground truncate">{email}</p>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 h-11 rounded-xl text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-zinc-800 active:bg-zinc-800 border border-transparent select-none"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-border shrink-0">
        {signOutForm}
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setOpen(true)}
          className="fixed top-3 left-3 z-40 lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-900 border border-border text-muted-foreground hover:text-foreground hover:bg-zinc-800 active:scale-90 transition-all duration-150 shadow-lg"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 w-72 h-full bg-zinc-900 border-r border-border transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
