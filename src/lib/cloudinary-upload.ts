import { validateFile, FOLDERS, sanitizeFolderName } from "./media/validation"
import { normalizeImage } from "./media/transforms"

export class UploadError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UploadError"
  }
}

export interface UploadResult {
  secureUrl: string
  publicId: string
  folder: string
}

export interface UploadOptions {
  slug?: string
  target?: "featured" | "gallery"
  folder?: string
}

function buildFolder(options: UploadOptions): string {
  if (options.folder) return options.folder
  if (options.slug) {
    const slug = sanitizeFolderName(options.slug)
    return options.target === "gallery"
      ? FOLDERS.productsGallery(slug)
      : FOLDERS.productsFeatured(slug)
  }
  return "3dfactory/products"
}

export async function uploadToCloudinary(
  file: File,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const validation = validateFile(file)
  if (!validation.valid) {
    throw new UploadError(validation.error ?? "Invalid file")
  }

  const compressed = await normalizeImage(file)
  const folder = buildFolder(options)

  const sigRes = await fetch("/api/upload/signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder }),
  })

  if (!sigRes.ok) {
    const err = await sigRes.json().catch(() => ({}))
    throw new UploadError(err.error ?? "Failed to get upload signature")
  }

  const { timestamp, signature, cloudName, apiKey } = await sigRes.json()

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

    return {
      secureUrl: result.secure_url as string,
      publicId: result.public_id as string,
      folder: result.public_id
        ? (result.public_id as string).substring(0, (result.public_id as string).lastIndexOf("/"))
        : folder,
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

export interface AbortableUpload {
  promise: Promise<UploadResult>
  abort: () => void
}

export function uploadToCloudinaryWithProgress(
  file: File,
  options: UploadOptions = {},
  onProgress?: (pct: number) => void
): AbortableUpload {
  const xhr = new XMLHttpRequest()
  let rejected = false

  const promise = new Promise<UploadResult>(async (resolve, reject) => {
    try {
      const validation = validateFile(file)
      if (!validation.valid) {
        throw new UploadError(validation.error ?? "Invalid file")
      }

      const compressed = await normalizeImage(file)
      if (rejected) return
      onProgress?.(10)
      const folder = buildFolder(options)

      const sigRes = await fetch("/api/upload/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      })

      if (!sigRes.ok) {
        const err = await sigRes.json().catch(() => ({}))
        throw new UploadError(err.error ?? "Failed to get upload signature")
      }

      const { timestamp, signature, cloudName, apiKey } = await sigRes.json()
      if (rejected) return
      onProgress?.(20)

      const formData = new FormData()
      formData.append("file", compressed, file.name)
      formData.append("folder", folder)
      formData.append("timestamp", String(timestamp))
      formData.append("api_key", apiKey)
      formData.append("signature", signature)

      const timeout = setTimeout(() => xhr.abort(), 60000)

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          onProgress?.(20 + Math.round((e.loaded / e.total) * 70))
        }
      }

      xhr.onload = () => {
        clearTimeout(timeout)
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const result = JSON.parse(xhr.responseText)
            onProgress?.(100)
            resolve({
              secureUrl: result.secure_url as string,
              publicId: result.public_id as string,
              folder: result.public_id
                ? (result.public_id as string).substring(0, (result.public_id as string).lastIndexOf("/"))
                : folder,
            })
          } catch {
            reject(new UploadError("Failed to parse upload response"))
          }
        } else {
          try {
            const err = JSON.parse(xhr.responseText)
            reject(new UploadError(err.error?.message ?? "Cloudinary upload failed"))
          } catch {
            reject(new UploadError(`Upload failed with status ${xhr.status}`))
          }
        }
      }

      xhr.onerror = () => {
        clearTimeout(timeout)
        reject(new UploadError("Network error during upload"))
      }

      xhr.onabort = () => {
        clearTimeout(timeout)
        reject(new UploadError("Upload was cancelled"))
      }

      xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`)
      xhr.send(formData)
    } catch (err) {
      reject(err instanceof UploadError ? err : new UploadError("Upload preparation failed"))
    }
  })

  return {
    promise,
    abort: () => {
      rejected = true
      xhr.abort()
    },
  }
}
