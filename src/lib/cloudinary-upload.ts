import imageCompression from "browser-image-compression"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"]
const MAX_SIZE_MB = 5

export class UploadError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UploadError"
  }
}

function validateFile(file: File): void {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new UploadError(
      `Unsupported file type "${file.type}". Allowed: JPEG, PNG, WebP, AVIF`
    )
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new UploadError(`File too large (max ${MAX_SIZE_MB}MB)`)
  }
}

async function compressImage(file: File): Promise<Blob> {
  return imageCompression(file, {
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    fileType: file.type as "image/jpeg" | "image/png" | "image/webp",
    initialQuality: 0.85,
  })
}

export async function uploadToCloudinary(file: File): Promise<string> {
  validateFile(file)

  const compressed = await compressImage(file)

  const sigRes = await fetch("/api/upload/signature", { method: "POST" })
  if (!sigRes.ok) {
    const err = await sigRes.json().catch(() => ({}))
    throw new UploadError(err.error ?? "Failed to get upload signature")
  }

  const { timestamp, signature, cloudName, apiKey, folder } = await sigRes.json()

  const formData = new FormData()
  formData.append("file", compressed, file.name)
  formData.append("folder", folder)
  formData.append("timestamp", String(timestamp))
  formData.append("api_key", apiKey)
  formData.append("signature", signature)

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 60000)

  try {
    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData, signal: controller.signal }
    )

    if (!uploadRes.ok) {
      const err = await uploadRes.json().catch(() => ({}))
      throw new UploadError(err.error?.message ?? "Cloudinary upload failed")
    }

    const result = await uploadRes.json()
    return result.secure_url as string
  } finally {
    clearTimeout(timeoutId)
  }
}
