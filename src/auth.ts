import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const googleProvider = Google({
  clientId: process.env.AUTH_GOOGLE_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET,
})

// Auth.js v5 reads provider.clientId from the top level. Google()
// stores them inside `options`, so promote them explicitly.
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
    async jwt({ token, account, profile }) {
      if (account) {
        const userEmail = normalizeEmail(token.email ?? profile?.email)
        const adminEmail = normalizeEmail(process.env.ADMIN_GOOGLE_EMAIL)
        token.isAdmin = userEmail.length > 0 && userEmail === adminEmail
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = !!token.isAdmin
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
