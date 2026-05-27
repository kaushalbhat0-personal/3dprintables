"use client"

import { MessageCircle } from "lucide-react"
import { SITE } from "@/lib/constants"

export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 hover:bg-[#20BD5A] hover:scale-110 transition-all duration-300 md:hidden"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}
