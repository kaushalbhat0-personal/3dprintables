import { Package, Tag, MessageSquare, Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface AdminNavItem {
  label: string
  href: string
  icon: LucideIcon
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Tag },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
]
