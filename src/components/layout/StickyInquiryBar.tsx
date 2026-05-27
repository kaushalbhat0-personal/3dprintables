"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MessageCircle } from "lucide-react"
import { SITE } from "@/lib/constants"

const HIDDEN_PATHS = ["/contact", "/admin"]

function isModalOpen(): boolean {
  if (typeof document === "undefined") return false
  return document.body.hasAttribute("data-inquiry-modal-open")
}

function shouldHideOnPath(pathname: string): boolean {
  return HIDDEN_PATHS.some((p) => pathname.startsWith(p)) || isModalOpen()
}

export function StickyInquiryBar() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setVisible(false)
  }, [pathname])

  useEffect(() => {
    if (shouldHideOnPath(pathname)) return

    const onScroll = () => {
      if (isModalOpen()) {
        setVisible(false)
        return
      }
      setVisible(
        window.scrollY > 600 &&
          window.scrollY < document.body.scrollHeight - 1200
      )
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (isModalOpen()) setVisible(false)
    })
    observer.observe(document.body, { attributes: true })
    return () => observer.disconnect()
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi! I'd like to discuss a custom 3D printing project.")}`

  if (!visible) return null

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 hover:bg-[#20BD5A] hover:scale-110 active:scale-95 transition-all duration-300 md:hidden"
      aria-label="Get a quote on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}
