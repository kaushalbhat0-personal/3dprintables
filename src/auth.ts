import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const googleProvider = Google({
  clientId: process.env.AUTH_GOOGLE_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET,
})

// Auth.js v5 reads provider.clientId/clientSecret from the top level,
// but Google() stores them inside `options`. Set them explicitly so
// the OAuth callback never receives undefined.
googleProvider.clientId = process.env.AUTH_GOOGLE_ID
googleProvider.clientSecret = process.env.AUTH_GOOGLE_SECRET

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [googleProvider],
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const adminEmail = process.env.ADMIN_GOOGLE_EMAIL
        token.isAdmin = typeof token.email === "string" && typeof adminEmail === "string"
          ? token.email === adminEmail
          : false
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
