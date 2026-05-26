"use client"

import { motion } from "framer-motion"
import { MessageCircle, Package, ShieldCheck, Truck, Clock } from "lucide-react"
import Link from "next/link"
import { SITE } from "@/lib/constants"
import { cn } from "@/lib/utils"

const stats = [
  { icon: Package, label: "500+ Orders Delivered" },
  { icon: Clock, label: "24hr Quick Turnaround" },
  { icon: Truck, label: "Pan India Shipping" },
  { icon: ShieldCheck, label: "Premium Quality Guaranteed" },
] as const

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
} as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
} as const

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <motion.div
        className="container-main w-full"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-primary bg-primary/10 border border-primary/20 rounded-full">
              Premium 3D Printing Studio
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]"
          >
            Custom 3D Prints{" "}
            <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">
              Built With Precision
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
          >
            From concept to creation. We design and deliver premium 3D printed
            products across India — custom decor, functional prototypes, unique
            gifts, and everything in between.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2.5 h-13 px-8 text-base font-medium rounded-xl",
                "bg-primary text-primary-foreground hover:bg-primary-hover",
                "shadow-lg shadow-primary/25 transition-all duration-200",
                "w-full sm:w-auto"
              )}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Get a Quote on WhatsApp</span>
            </a>

            <Link
              href="/catalog"
              className={cn(
                "inline-flex items-center justify-center gap-2.5 h-13 px-8 text-base font-medium rounded-xl",
                "border border-border text-foreground hover:bg-zinc-800 hover:border-zinc-600",
                "transition-all duration-200",
                "w-full sm:w-auto"
              )}
            >
              <Package className="w-5 h-5" />
              <span>Explore Catalog</span>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-zinc-900/50 border border-border/50"
              >
                <stat.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground text-center leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
