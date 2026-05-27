import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "PrintCraft | Premium 3D Printed Products",
    template: "%s | PrintCraft",
  },
  description:
    "We design and deliver high-quality 3D printed products — from home decor to custom prototypes. Based in India. Order via WhatsApp.",
  keywords: [
    "3D printing",
    "3D printed products",
    "custom 3D printing",
    "India 3D printing",
    "3D printed decor",
    "3D printed gifts",
    "prototyping",
  ],
  openGraph: {
    title: "PrintCraft | Premium 3D Printed Products",
    description:
      "We design and deliver high-quality 3D printed products — from home decor to custom prototypes. Order via WhatsApp.",
    siteName: "PrintCraft",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrintCraft | Premium 3D Printed Products",
    description:
      "We design and deliver high-quality 3D printed products — from home decor to custom prototypes.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
