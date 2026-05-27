"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { LogIn, LogOut, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

export function AuthStatus() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  if (isLoading) {
    return <div className="w-[88px] h-10 rounded-xl bg-zinc-800/50 animate-pulse" />
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className={cn(
          "inline-flex items-center gap-2 h-10 px-5 text-sm font-medium rounded-xl",
          "bg-zinc-800 text-foreground hover:bg-zinc-700 border border-border",
          "transition-all duration-200"
        )}
      >
        <LogIn className="w-4 h-4" />
        <span>Login</span>
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {session.user.isAdmin && (
        <Link
          href="/admin/products"
          className={cn(
            "inline-flex items-center gap-2 h-10 px-4 text-sm font-medium rounded-xl",
            "bg-primary text-primary-foreground hover:bg-primary-hover",
            "transition-all duration-200"
          )}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
      )}
      <button
        onClick={() => signOut({ redirectTo: "/" })}
        className={cn(
          "inline-flex items-center gap-2 h-10 px-4 text-sm font-medium rounded-xl",
          "bg-zinc-800 text-foreground hover:bg-zinc-700 border border-border",
          "transition-all duration-200"
        )}
        title="Sign out"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  )
}
