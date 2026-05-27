import { LoginForm } from "./LoginForm"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Sign in to manage your store
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
