const CLOUDINARY_REGEX = /\/\/res\.cloudinary\.com\/[\w-]+\/image\/upload\//

export function isCloudinaryUrl(url: string): boolean {
  return CLOUDINARY_REGEX.test(url)
}

export function optimizeCloudinaryUrl(
  url: string,
  options: {
    width?: number
    height?: number
    quality?: "auto" | "best" | "good" | "low"
    format?: "auto" | "webp" | "avif" | "jpg" | "png"
    crop?: "fill" | "scale" | "fit" | "thumb"
  } = {}
): string {
  if (!isCloudinaryUrl(url)) return url

  const { width, height, quality = "auto", format = "auto", crop = "fill" } = options

  const transforms = [`f_${format}`, `q_${quality}`]
  if (width) transforms.push(`w_${width}`)
  if (height) transforms.push(`h_${height}`)
  if (crop) transforms.push(`c_${crop}`)

  const uploadIndex = url.indexOf("/image/upload/")
  if (uploadIndex === -1) return url

  const insertPoint = uploadIndex + "/image/upload/".length
  return `${url.slice(0, insertPoint)}${transforms.join(",")}/${url.slice(insertPoint)}`
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
