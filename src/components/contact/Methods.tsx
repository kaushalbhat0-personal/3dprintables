import { MessageCircle, Mail, Globe, MapPin } from "lucide-react"
import { SITE } from "@/lib/constants"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

const methods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description:
      "Fastest response. Send us a message and we'll reply within a few hours.",
    href: `https://wa.me/${SITE.whatsapp}`,
    label: "Chat on WhatsApp",
    primary: true,
  },
  {
    icon: Mail,
    title: "Email",
    description:
      "For detailed inquiries, quotes, or collaboration proposals.",
    href: `mailto:${SITE.email}`,
    label: "Send an Email",
    primary: false,
  },
  {
    icon: Globe,
    title: "Instagram",
    description:
      "Follow our work, see behind-the-scenes, and DM us directly.",
    href: SITE.instagram,
    label: "Follow on Instagram",
    primary: false,
  },
  {
    icon: MapPin,
    title: "Service Area",
    description:
      "Based in India. We ship to all major cities and towns across the country.",
    href: "#",
    label: "Pan-India Delivery",
    primary: false,
  },
]

export function Methods() {
  return (
    <section className="pb-16 md:pb-20">
      <div className="container-main">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {methods.map((method) => (
            <Card
              key={method.title}
              as="article"
              className={cn(
                "p-6 md:p-7",
                method.primary && "border-primary/30 bg-zinc-900"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex items-center justify-center w-11 h-11 rounded-xl shrink-0",
                    method.primary
                      ? "bg-[#25D366]/10 border border-[#25D366]/20"
                      : "bg-primary/10 border border-primary/20"
                  )}
                >
                  <method.icon
                    className={cn(
                      "w-5 h-5",
                      method.primary ? "text-[#25D366]" : "text-primary"
                    )}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-foreground">
                    {method.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    {method.description}
                  </p>
                  <a
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      method.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={cn(
                      "inline-flex items-center gap-1 mt-3 text-sm font-medium transition-colors",
                      method.primary
                        ? "text-[#25D366] hover:text-[#20BD5A]"
                        : "text-primary hover:text-primary-hover"
                    )}
                  >
                    {method.label} &rarr;
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
