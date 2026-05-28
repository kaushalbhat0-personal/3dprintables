import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

const AUTH_SECRET = process.env.AUTH_SECRET
const AUTH_URL = process.env.AUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL

console.log("[AUTH INIT] adminEmail", JSON.stringify(process.env.ADMIN_GOOGLE_EMAIL))
console.log("[AUTH INIT] adminEmailLen", process.env.ADMIN_GOOGLE_EMAIL?.length)
console.log("[AUTH INIT] hasSecret", !!AUTH_SECRET)
console.log("[AUTH INIT] authUrl", AUTH_URL)

const googleProvider = Google({
  clientId: process.env.AUTH_GOOGLE_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET,
})

googleProvider.clientId = process.env.AUTH_GOOGLE_ID
googleProvider.clientSecret = process.env.AUTH_GOOGLE_SECRET

function normalizeEmail(email: unknown): string {
  return String(email ?? "").toLowerCase().trim()
}

async function syncUser(email: string, name: string | null, image: string | null) {
  const adminEmail = normalizeEmail(process.env.ADMIN_GOOGLE_EMAIL)
  const role: "admin" | "user" = email === adminEmail ? "admin" : "user"
  const now = new Date().toISOString()

  try {
    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (existing) {
      await db
        .update(users)
        .set({
          name: name ?? undefined,
          image: image ?? undefined,
          role,
          lastLoginAt: now,
          updatedAt: now,
        })
        .where(eq(users.email, email))
      return existing.id
    }

    const id = crypto.randomUUID()
    await db.insert(users).values({
      id,
      email,
      name,
      image,
      role,
      lastLoginAt: now,
    })
    return id
  } catch (err) {
    console.error("[AUTH syncUser] Failed:", err)
    return null
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [googleProvider],
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    async signIn({ user, profile }) {
      console.log("[AUTH signIn] userEmail", user?.email)
      console.log("[AUTH signIn] profileEmail", profile?.email)

      if (user?.email) {
        const userId = await syncUser(
          normalizeEmail(user.email),
          user.name ?? null,
          user.image ?? null,
        )
        console.log("[AUTH signIn] userId", userId)
      }

      return true
    },
    async jwt({ token, account, profile }) {
      if (account) {
        const rawAdmin = process.env.ADMIN_GOOGLE_EMAIL
        const userEmail = normalizeEmail(token.email ?? profile?.email)
        const adminEmail = normalizeEmail(rawAdmin)
        console.log("[AUTH jwt] rawAdminEmail", JSON.stringify(rawAdmin))
        console.log("[AUTH jwt] rawAdminEmail.length", rawAdmin?.length)
        console.log("[AUTH jwt] userEmail", userEmail)
        console.log("[AUTH jwt] adminEmail", adminEmail)
        console.log("[AUTH jwt] match", userEmail === adminEmail)
        token.isAdmin = userEmail.length > 0 && userEmail === adminEmail
        console.log("[AUTH jwt] isAdmin", token.isAdmin)
      } else {
        console.log("[AUTH jwt reusing token isAdmin]", token.isAdmin)
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = !!token.isAdmin
        console.log("[AUTH session] email", session.user.email)
        console.log("[AUTH session] tokenIsAdmin", token.isAdmin)
        console.log("[AUTH session] sessionIsAdmin", session.user.isAdmin)
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
