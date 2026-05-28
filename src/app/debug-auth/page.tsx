import { auth } from "@/auth"
import { headers, cookies } from "next/headers"

export default async function DebugAuthPage() {
  const session = await auth()
  const hdrs = await headers()
  const cks = await cookies()

  const cookieJar: Record<string, string> = {}
  for (const c of cks.getAll()) {
    cookieJar[c.name] = c.value.substring(0, 40) + "..."
  }

  const adminEmailRaw = process.env.ADMIN_GOOGLE_EMAIL

  return (
    <div className="min-h-screen bg-background p-8 text-sm font-mono text-foreground">
      <h1 className="text-lg font-bold mb-4">Auth Debug</h1>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Env Vars</h2>
        <pre className="bg-zinc-900 p-4 rounded-xl border border-border overflow-auto">
          {JSON.stringify({
            ADMIN_GOOGLE_EMAIL_set: adminEmailRaw !== undefined && adminEmailRaw !== null,
            ADMIN_GOOGLE_EMAIL_length: adminEmailRaw?.length ?? 0,
            ADMIN_GOOGLE_EMAIL_chars: adminEmailRaw ? adminEmailRaw.split("").map(c => c.charCodeAt(0)) : null,
            ADMIN_GOOGLE_EMAIL: adminEmailRaw,
            AUTH_SECRET_set: !!process.env.AUTH_SECRET,
            AUTH_URL: process.env.AUTH_URL ?? "not set",
            NODE_ENV: process.env.NODE_ENV,
            VERCEL: process.env.VERCEL,
          }, null, 2)}
        </pre>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Session</h2>
        <pre className="bg-zinc-900 p-4 rounded-xl border border-border overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Cookies received ({cks.getAll().length})</h2>
        <pre className="bg-zinc-900 p-4 rounded-xl border border-border overflow-auto">
          {JSON.stringify(cookieJar, null, 2)}
        </pre>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Request Headers (key ones)</h2>
        <pre className="bg-zinc-900 p-4 rounded-xl border border-border overflow-auto">
          {JSON.stringify({
            host: hdrs.get("host"),
            "x-forwarded-host": hdrs.get("x-forwarded-host"),
            "x-forwarded-proto": hdrs.get("x-forwarded-proto"),
            cookie: hdrs.get("cookie") ? "present" : "absent",
          }, null, 2)}
        </pre>
      </section>
    </div>
  )
}
