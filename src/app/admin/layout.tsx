import { redirect } from "next/navigation"
import { auth, signOut } from "@/auth"
import { LogOut } from "lucide-react"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session?.user?.isAdmin) redirect("/login")

  return (
    <div className="min-h-screen bg-background lg:flex">
      <AdminSidebar
        email={session.user.email ?? ""}
        signOutForm={
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-3 w-full h-11 px-4 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 active:scale-[0.97] transition-all duration-150"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              Sign Out
            </button>
          </form>
        }
      />
      <main className="flex-1 min-w-0 pt-16 lg:pt-0">{children}</main>
    </div>
  )
}
