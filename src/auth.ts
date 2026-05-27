import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const googleProvider = Google({
  clientId: process.env.AUTH_GOOGLE_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET,
})

googleProvider.clientId = process.env.AUTH_GOOGLE_ID
googleProvider.clientSecret = process.env.AUTH_GOOGLE_SECRET

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [googleProvider],
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("[AUTH DEBUG signIn]", {
        userEmail: user?.email,
        accountProvider: account?.provider,
        profileEmail: profile?.email,
      })
      return true
    },
    async jwt({ token, account, profile }) {
      if (account) {
        const rawAdminEmail = process.env.ADMIN_GOOGLE_EMAIL
        const rawTokenEmail = token.email ?? profile?.email ?? ""
        const match = rawTokenEmail.toLowerCase().trim() === (rawAdminEmail ?? "").toLowerCase().trim()
        console.log("[AUTH DEBUG jwt]", {
          tokenEmail: rawTokenEmail,
          profileEmail: profile?.email,
          adminEmail: rawAdminEmail,
          match,
          accountId: account.providerAccountId,
        })
        token.isAdmin = rawTokenEmail.length > 0 && match
        console.log("[AUTH DEBUG jwt result]", { tokenIsAdmin: token.isAdmin })
      } else {
        console.log("[AUTH DEBUG jwt no-account]", {
          tokenEmail: token.email,
          tokenIsAdmin: token.isAdmin,
        })
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = !!token.isAdmin
        console.log("[AUTH DEBUG session]", {
          sessionEmail: session.user.email,
          tokenIsAdmin: token.isAdmin,
          sessionIsAdmin: session.user.isAdmin,
        })
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
