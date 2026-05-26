export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ")
}

export function formatWhatsAppUrl(phone: string, productName: string): string {
  const text = encodeURIComponent(
    `Hi! I'm interested in "${productName}". Could you share more details?`
  )
  return `https://wa.me/${phone}?text=${text}`
}
