const CLOUDINARY_REGEX = /\/\/res\.cloudinary\.com\/[\w-]+\/image\/upload\//

export function isCloudinaryUrl(url: string): boolean {
  return CLOUDINARY_REGEX.test(url)
}

const QUALITY_MAP: Record<string, string> = {
  auto: "q_auto",
  best: "q_auto:best",
  good: "q_auto:good",
  low: "q_auto:low",
  eco: "q_auto:eco",
}

export function optimizeCloudinaryUrl(
  url: string,
  options: {
    width?: number
    height?: number
    quality?: "auto" | "best" | "good" | "low" | "eco"
    format?: "auto" | "webp" | "avif" | "jpg" | "png"
    crop?: "fill" | "scale" | "fit" | "thumb"
    effects?: string[]
  } = {}
): string {
  if (!url || !isCloudinaryUrl(url)) return url

  const { width, height, quality = "auto", format = "auto", crop = "fill", effects } = options

  const parts: string[] = [`f_${format}`]

  const q = QUALITY_MAP[quality]
  if (q) parts.push(q)

  if (width != null) parts.push(`w_${width}`)
  if (height != null) parts.push(`h_${height}`)
  if (crop) parts.push(`c_${crop}`)
  if (effects?.length) {
    for (const effect of effects) {
      if (effect) parts.push(effect)
    }
  }

  const valid = parts.filter(Boolean)
  if (valid.length === 0) return url

  const uploadIndex = url.indexOf("/image/upload/")
  if (uploadIndex === -1) return url

  const insertPoint = uploadIndex + "/image/upload/".length
  return `${url.slice(0, insertPoint)}${valid.join(",")}/${url.slice(insertPoint)}`
}

export function optimizeImage(
  url: string,
  width: number
): string {
  return optimizeCloudinaryUrl(url, { width, format: "auto", quality: "auto", crop: "fill" })
}

export function optimizeThumbnail(url: string): string {
  return optimizeCloudinaryUrl(url, { width: 120, height: 120, format: "auto", quality: "auto", crop: "thumb" })
}

export function optimizeHero(url: string): string {
  return optimizeCloudinaryUrl(url, { width: 1200, format: "auto", quality: "auto", crop: "scale" })
}

export function optimizeGallery(url: string, width: number = 800): string {
  return optimizeCloudinaryUrl(url, { width, format: "auto", quality: "auto", crop: "fill" })
}

export function optimizeCard(url: string): string {
  return optimizeCloudinaryUrl(url, { width: 600, format: "auto", quality: "auto", crop: "fill" })
}

export function optimizeAvatar(url: string): string {
  return optimizeCloudinaryUrl(url, { width: 96, height: 96, format: "auto", quality: "auto", crop: "thumb" })
}
