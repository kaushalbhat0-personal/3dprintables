import { auth } from "@/auth"
import { NextResponse } from "next/server"
import crypto from "crypto"

export const runtime = "nodejs"

export async function POST() {
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

  const timestamp = Math.floor(Date.now() / 1000)
  const folder = "3dfactory/products"

  const signature = crypto
    .createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex")

  return NextResponse.json({ timestamp, signature, cloudName, apiKey, folder })
}
