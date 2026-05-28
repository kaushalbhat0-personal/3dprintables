import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

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

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [googleProvider],
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    async signIn({ user, profile }) {
      console.log("[AUTH signIn] userEmail", user?.email)
      console.log("[AUTH signIn] profileEmail", profile?.email)
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
