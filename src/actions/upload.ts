"use server"

import { cloudinary } from "@/lib/cloudinary"

export async function uploadProductImageAction(
  formData: FormData
): Promise<
  { success: true; url: string; publicId: string } | { success: false; error: string }
> {
  try {
    const file = formData.get("image") as File | null
    if (!file) return { success: false, error: "No image file provided" }

    if (!file.type.startsWith("image/")) {
      return { success: false, error: "File must be an image" }
    }

    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return { success: false, error: "Image must be under 10MB" }
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "3dfactory/products",
            resource_type: "image",
            transformation: [
              { quality: "auto", fetch_format: "auto" },
              { width: 2000, crop: "limit" },
            ],
          },
          (err, result) => {
            if (err || !result) reject(err ?? new Error("Upload failed"))
            else resolve(result as { secure_url: string; public_id: string })
          }
        )
        stream.end(buffer)
      }
    )

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to upload image",
    }
  }
}
