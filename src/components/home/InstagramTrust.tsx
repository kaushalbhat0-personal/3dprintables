import { Globe, Heart, Play, Camera } from "lucide-react"
import Link from "next/link"
import { SITE } from "@/lib/constants"
import { Section } from "@/components/ui/Section"
import { Heading } from "@/components/ui/Heading"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

const stats = [
  { icon: Globe, label: "Followers", value: "2.4K+" },
  { icon: Camera, label: "Projects Delivered", value: "500+" },
  { icon: Play, label: "Reel Views", value: "1M+" },
  { icon: Heart, label: "Satisfaction", value: "98%" },
] as const

const posts = [
  {
    gradient: "from-amber-800/60 via-zinc-900 to-zinc-900",
    caption: "Fresh off the build plate — geometric vase in matte PLA+",
    likes: "342",
    icon: Camera,
  },
  {
    gradient: "from-emerald-800/60 via-zinc-900 to-zinc-900",
    caption: "Timelapse: 12-hour print compressed into 60 seconds",
    likes: "891",
    icon: Play,
  },
  {
    gradient: "from-rose-800/60 via-zinc-900 to-zinc-900",
    caption: "Custom dragon bust headed to its new home 🐉",
    likes: "567",
    icon: Camera,
  },
  {
    gradient: "from-sky-800/60 via-zinc-900 to-zinc-900",
    caption: "Behind the scenes — post-processing resin prints",
    likes: "234",
    icon: Camera,
  },
  {
    gradient: "from-violet-800/60 via-zinc-900 to-zinc-900",
    caption: "Bulk order delivery for a startup client — 200 units",
    likes: "423",
    icon: Camera,
  },
  {
    gradient: "from-orange-800/60 via-zinc-900 to-zinc-900",
    caption: "New filament spools arrived — restocking the lab",
    likes: "178",
    icon: Camera,
  },
]

export function InstagramTrust() {
  return (
    <Section id="instagram">
      <Heading
        title="Follow Our Work on Instagram"
        subtitle="We share builds, timelapses, customer deliveries, and behind-the-scenes content daily. See the craft in action."
      />

      <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-zinc-900/50 border border-border/50"
          >
            <stat.icon className="w-5 h-5 text-primary" />
            <span className="text-xl font-bold text-foreground">
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 md:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {posts.map((post) => (
          <Card
            key={post.caption}
            className="group aspect-square relative overflow-hidden"
            hover
          >
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
                post.gradient
              )}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute top-3 left-3">
              <post.icon className="w-4 h-4 text-white/70" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-[10px] leading-tight text-white/80 line-clamp-2">
                {post.caption}
              </p>
              <div className="flex items-center gap-1 mt-1.5">
                <Heart className="w-3 h-3 text-rose-400" />
                <span className="text-[10px] text-white/60">{post.likes}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 md:mt-14 text-center">
        <Link
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center justify-center gap-2.5 h-13 px-8 text-base font-medium rounded-xl",
            "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white",
            "shadow-lg shadow-[#833AB4]/20 hover:shadow-xl hover:shadow-[#833AB4]/30",
            "transition-all duration-200"
          )}
        >
          <Globe className="w-5 h-5" />
          <span>Follow Our Journey</span>
        </Link>
      </div>
    </Section>
  )
}
