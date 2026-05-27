import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { StickyInquiryBar } from "@/components/layout/StickyInquiryBar"
import { siteUrl } from "@/lib/url"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "3D Factory | Custom 3D Creations Studio",
    template: "%s | 3D Factory",
  },
  description:
    "Custom 3D printing studio for personalized gifts, home decor, cosplay collectibles, prototypes and more. Bring your ideas to life — order via WhatsApp.",
  keywords: [
    "custom 3D printing India",
    "3D printed gifts",
    "personalized decor",
    "3D printed collectibles",
    "cosplay props",
    "custom creations",
    "3D printing studio India",
    "unique gift ideas",
    "custom 3D models",
  ],
  openGraph: {
    title: "3D Factory | Custom 3D Creations Studio",
    description:
      "Custom 3D printing studio for personalized gifts, home decor, cosplay collectibles, prototypes and more. Bring your ideas to life.",
    siteName: "3D Factory",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Factory | Custom 3D Creations Studio",
    description:
      "Custom 3D printing studio for personalized gifts, home decor, cosplay collectibles, prototypes and more. Bring your ideas to life.",
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
        <StickyInquiryBar />
      </body>
    </html>
  )
}
