import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton"

export default async function LoginPage() {
  const session = await auth()

  if (session?.user?.isAdmin) redirect("/admin/products")
  if (session?.user?.email) redirect("/profile")

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Sign In</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Sign in with your Google account to access your profile
          </p>
        </div>
        <GoogleSignInButton />
      </div>
    </div>
  )
}
