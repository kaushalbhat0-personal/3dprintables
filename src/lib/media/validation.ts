export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/heic",
  "image/heif",
] as const

export const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".heic", ".heif"] as const

export const MAX_IMAGE_SIZE_MB = 5
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024

const HEIC_TYPES = ["image/heic", "image/heif"] as const

export function isHeic(file: File): boolean {
  return HEIC_TYPES.includes(file.type as typeof HEIC_TYPES[number]) ||
    HEIC_TYPES.includes(`image/${file.name.split(".").pop()?.toLowerCase()}` as typeof HEIC_TYPES[number])
}

export function validateFile(file: File): { valid: boolean; error?: string } {
  const ext = "." + (file.name.split(".").pop()?.toLowerCase() ?? "")

  const isAllowedType = ALLOWED_IMAGE_TYPES.includes(file.type as typeof ALLOWED_IMAGE_TYPES[number])
  const isAllowedExt = ALLOWED_IMAGE_EXTENSIONS.includes(ext as typeof ALLOWED_IMAGE_EXTENSIONS[number])

  if (!isAllowedType && !isAllowedExt) {
    return {
      valid: false,
      error: `Unsupported file type "${file.type || ext}". Allowed: JPEG, PNG, WebP, AVIF, HEIC`,
    }
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File too large (max ${MAX_IMAGE_SIZE_MB}MB)`,
    }
  }

  return { valid: true }
}

export function sanitizeFolderName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/-+/g, "-")
}

export const FOLDERS = {
  products: (slug: string) => `3dfactory/products/${sanitizeFolderName(slug)}`,
  productsFeatured: (slug: string) => `3dfactory/products/${sanitizeFolderName(slug)}`,
  productsGallery: (slug: string) => `3dfactory/products/${sanitizeFolderName(slug)}/gallery`,
  testimonials: "3dfactory/testimonials",
  gallery: "3dfactory/gallery",
  videos: (slug: string) => `3dfactory/videos/${sanitizeFolderName(slug)}`,
}
