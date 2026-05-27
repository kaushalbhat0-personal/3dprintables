import { auth } from "@/auth"
import { NextResponse } from "next/server"
import crypto from "crypto"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "Cloudinary not configured" }, { status: 500 })
  }

  const body = await request.json().catch(() => ({}))
  const folder: string =
    typeof body.folder === "string" && body.folder.length > 0
      ? body.folder
      : "3dfactory/products"

  const sanitized = folder
    .replace(/[^a-z0-9/_-]/gi, "-")
    .replace(/-+/g, "-")
    .replace(/\/+/g, "/")

  if (sanitized.startsWith("/") || sanitized.includes("..")) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 })
  }

  const timestamp = Math.floor(Date.now() / 1000)

  const signature = crypto
    .createHash("sha1")
    .update(`folder=${sanitized}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex")

  return NextResponse.json({ timestamp, signature, cloudName, apiKey, folder: sanitized })
}
