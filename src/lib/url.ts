export function siteUrl(path?: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  if (!path) return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}
