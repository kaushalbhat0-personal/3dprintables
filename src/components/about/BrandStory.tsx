import Image from "next/image"
import { Container } from "@/components/ui/Container"

export function BrandStory() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              From a Workshop to Your Doorstep
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-muted leading-relaxed">
              <p>
                3D Factory started in a small room with a single printer and a
                big curiosity. We wanted to see if consumer 3D printing could
                produce things that didn&apos;t just look good on a shelf — but
                actually served a purpose.
              </p>
              <p>
                Over time, we upgraded our tools, refined our techniques, and 3D Factory
                built a network of suppliers and designers who share our
                obsession with quality. Today, we work with businesses, creators,
                and individuals across India — turning rough sketches,
                photographs, and CAD files into finished products.
              </p>
              <p>
                We still run the studio ourselves. Every print is checked before
                it ships. Every material is stored with care. And every customer
                gets a real human being on the other end of WhatsApp.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-border group">
            <Image
              src="/images/products/prototype-part.png"
              alt="3D printed prototype part showcase"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
