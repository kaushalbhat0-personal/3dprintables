import { MessageCircle } from "lucide-react"
import type { Product } from "@/types"
import { Card } from "@/components/ui/Card"
import { cn, formatWhatsAppUrl } from "@/lib/utils"
import { SITE } from "@/lib/constants"
import { PRODUCT_CATEGORIES } from "@/types"

const gradients = [
  "from-amber-900/40 to-zinc-900",
  "from-emerald-900/40 to-zinc-900",
  "from-rose-900/40 to-zinc-900",
  "from-sky-900/40 to-zinc-900",
  "from-violet-900/40 to-zinc-900",
  "from-orange-900/40 to-zinc-900",
]

function getCategoryLabel(category: string): string {
  return PRODUCT_CATEGORIES.find((c) => c.value === category)?.label ?? category
}

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const whatsappUrl = formatWhatsAppUrl(SITE.whatsapp, product.title)

  return (
    <Card as="article" className="flex flex-col group">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className={cn(
              "w-full h-full bg-gradient-to-br",
              gradients[index % gradients.length]
            )}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="inline-block px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground border border-border/50">
            {getCategoryLabel(product.category)}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        <p className="mt-1.5 text-sm text-muted leading-relaxed flex-1 line-clamp-2">
          {product.shortDescription}
        </p>

        {product.priceRange && (
          <p className="mt-3 text-xs text-muted-foreground font-medium">
            Starting {product.priceRange}
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-border">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
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
