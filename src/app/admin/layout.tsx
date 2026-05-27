import Link from "next/link"
import { redirect } from "next/navigation"
import { auth, signOut } from "@/auth"
import { LogOut } from "lucide-react"

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session?.user?.isAdmin) redirect("/admin/login")

  const navItems = [
    { label: "Products", href: "/admin/products" },
    { label: "Inquiries", href: "/admin/inquiries" },
    { label: "Testimonials", href: "/admin/testimonials" },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <aside className="w-64 shrink-0 border-r border-border bg-zinc-900/50 flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/admin/products" className="text-lg font-bold tracking-tight text-foreground">
            Dashboard
          </Link>
        </div>
        <div className="px-6 pb-4 border-b border-border">
          <p className="text-xs text-muted-foreground">Signed in as</p>
          <p className="text-sm text-foreground truncate">{session.user.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-zinc-800 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
