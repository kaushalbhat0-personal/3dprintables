import imageCompression from "browser-image-compression"
import { isHeic } from "./validation"

export async function convertHeicToJpeg(file: File): Promise<Blob> {
  const heic2any = (await import("heic2any")).default
  const result = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.88,
  })
  return Array.isArray(result) ? result[0] : result
}

export async function normalizeImage(file: File): Promise<Blob> {
  let source: Blob | File = file

  if (isHeic(file)) {
    source = await convertHeicToJpeg(file)
  }

  const targetType =
    isHeic(file) ? "image/jpeg" as const
    : file.type === "image/png" ? "image/jpeg" as const
    : file.type as "image/jpeg" | "image/webp"

  const input = source instanceof File ? source : new File([source], file.name, { type: targetType })

  return imageCompression(input, {
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    fileType: targetType,
    initialQuality: 0.85,
  })
}

export function imageFileToBlobUrl(file: File): string {
  return URL.createObjectURL(file)
}
