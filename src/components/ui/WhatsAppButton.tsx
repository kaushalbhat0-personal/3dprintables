"use client"

import { MessageCircle } from "lucide-react"
import { cn, formatWhatsAppUrl } from "@/lib/utils"
import { SITE } from "@/lib/constants"

interface WhatsAppButtonProps {
  productName: string
  variant?: "primary" | "secondary" | "icon"
  className?: string
}

export function WhatsAppButton({
  productName,
  variant = "primary",
  className,
}: WhatsAppButtonProps) {
  const url = formatWhatsAppUrl(SITE.whatsapp, productName)

  if (variant === "icon") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors",
          className
        )}
        aria-label={`Inquire about ${productName} on WhatsApp`}
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200",
        "h-11 px-6 text-sm",
        variant === "primary" &&
          "bg-[#25D366] text-white hover:bg-[#20BD5A] shadow-lg shadow-[#25D366]/20",
        variant === "secondary" &&
          "border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10",
        className
      )}
    >
      <MessageCircle className="w-4 h-4" />
      <span>Inquire on WhatsApp</span>
    </a>
  )
}
