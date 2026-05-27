import Image from "next/image"
import { MessageCircle, Sparkles } from "lucide-react"
import type { Product } from "@/types"
import { Card } from "@/components/ui/Card"
import { cn, formatWhatsAppUrl } from "@/lib/utils"
import { SITE } from "@/lib/constants"
import { PRODUCT_CATEGORIES } from "@/types"

function getCategoryLabel(category: string): string {
  return PRODUCT_CATEGORIES.find((c) => c.value === category)?.label ?? category
}

interface ProductCardProps {
  product: Product
  onSelect?: (product: Product) => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const whatsappUrl = formatWhatsAppUrl(SITE.whatsapp, product.title)

  return (
    <Card as="article" className={cn("flex flex-col group", onSelect && "cursor-pointer")} onClick={() => onSelect?.(product)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
        <Image
          src={product.featuredImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />

        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground border border-border/50">
            {getCategoryLabel(product.category)}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
          {product.galleryImages && product.galleryImages.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md bg-black/50 text-white/70 backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              Gallery
            </span>
          )}
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md bg-amber-500/20 text-amber-400 backdrop-blur-sm">
            Made on Request
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {product.title}
        </h3>

        <p className="mt-1.5 text-sm text-muted leading-relaxed flex-1 line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {product.priceRange && (
            <p className="text-xs text-muted-foreground font-medium">
              Starting {product.priceRange}
            </p>
          )}
          {product.material && (
            <span className="text-[10px] text-muted-foreground/60 px-2 py-0.5 rounded-md bg-zinc-800/50 border border-border/30">
              {product.material}
            </span>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "inline-flex items-center justify-center gap-2 w-full h-10 text-sm font-medium rounded-xl",
              "bg-[#25D366] text-white hover:bg-[#20BD5A]",
              "transition-all duration-200 shadow-lg shadow-[#25D366]/15"
            )}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Get Quote</span>
          </a>
        </div>
      </div>
    </Card>
  )
}
