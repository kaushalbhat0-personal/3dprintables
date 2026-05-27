"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import { createSession, deleteSession, verifySession } from "@/lib/auth/session"

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export async function loginAction(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string } | null> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid input"
    return { error: first }
  }

  const { email, password } = parsed.data
  const validEmail = process.env.ADMIN_EMAIL
  const validPassword = process.env.ADMIN_PASSWORD

  if (!validEmail || !validPassword) {
    return { error: "Server misconfigured: admin credentials not set" }
  }

  if (email !== validEmail || password !== validPassword) {
    return { error: "Invalid email or password" }
  }

  await createSession(email)
  redirect("/admin/products")
}

export async function logoutAction(): Promise<void> {
  await deleteSession()
  redirect("/admin/login")
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await verifySession()
  return session !== null
}
