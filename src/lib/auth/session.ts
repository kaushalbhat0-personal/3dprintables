import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const SESSION_NAME = "admin_session"
const SESSION_DURATION = 7 * 24 * 60 * 60

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error("SESSION_SECRET env var is required")
  return new TextEncoder().encode(secret)
}

export interface SessionPayload {
  email: string
  role: "admin"
}

export async function createSession(email: string): Promise<void> {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION

  const token = await new SignJWT({ email, role: "admin" } satisfies SessionPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(getSecret())

  const cookieStore = await cookies()
  cookieStore.set(SESSION_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION,
  })
}

export async function verifySession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_NAME)?.value
    if (!token) return null

    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] })
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
}

export async function getSession(): Promise<SessionPayload | null> {
  return verifySession()
}
