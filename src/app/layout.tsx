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
    default: "3D Factory | Premium 3D Printing Studio",
    template: "%s | 3D Factory",
  },
  description:
    "India's production-grade 3D printing studio. Spiritual decor, cosplay collectibles, engineering prototypes, and custom manufacturing. Order via WhatsApp.",
  keywords: [
    "3D printing India",
    "3D printed decor",
    "cosplay 3D printing",
    "engineering prototypes",
    "custom manufacturing",
    "3D printing studio",
    "India 3D printing service",
  ],
  openGraph: {
    title: "3D Factory | Premium 3D Printing Studio",
    description:
      "India's production-grade 3D printing studio. Spiritual decor, cosplay collectibles, engineering prototypes, and custom manufacturing.",
    siteName: "3D Factory",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Factory | Premium 3D Printing Studio",
    description:
      "India's production-grade 3D printing studio. Spiritual decor, cosplay collectibles, engineering prototypes, and custom manufacturing.",
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
