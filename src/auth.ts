import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const AUTH_SECRET = process.env.AUTH_SECRET
const AUTH_URL = process.env.AUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL

console.log("[AUTH INIT]", {
  hasSecret: !!AUTH_SECRET,
  secretLen: AUTH_SECRET?.length,
  authUrl: AUTH_URL,
  googleId: !!process.env.AUTH_GOOGLE_ID,
  googleSecret: !!process.env.AUTH_GOOGLE_SECRET,
  adminEmail: process.env.ADMIN_GOOGLE_EMAIL,
  nodeEnv: process.env.NODE_ENV,
  vercel: process.env.VERCEL,
})

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
    async signIn({ user, account, profile }) {
      console.log("[AUTH signIn]", {
        userEmail: user?.email,
        accountProvider: account?.provider,
        profileEmail: profile?.email,
        profileEmailVerified: profile?.email_verified,
      })
      return true
    },
    async jwt({ token, account, profile }) {
      if (account) {
        const userEmail = normalizeEmail(token.email ?? profile?.email)
        const adminEmail = normalizeEmail(process.env.ADMIN_GOOGLE_EMAIL)
        token.isAdmin = userEmail.length > 0 && userEmail === adminEmail
        console.log("[AUTH jwt (sign-in)]", {
          tokenEmail: token.email,
          profileEmail: profile?.email,
          userEmail,
          adminEmail,
          isAdmin: token.isAdmin,
          trigger: account.type,
        })
      } else {
        console.log("[AUTH jwt (reuse)]", {
          tokenEmail: token.email,
          isAdmin: token.isAdmin,
        })
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = !!token.isAdmin
        console.log("[AUTH session]", {
          hasSession: true,
          email: session.user.email,
          isAdmin: session.user.isAdmin,
          tokenIsAdmin: token.isAdmin,
        })
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
