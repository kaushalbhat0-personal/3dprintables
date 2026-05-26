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
                PrintCraft started in a small room with a single printer and a
                big curiosity. We wanted to see if consumer 3D printing could
                produce things that didn&apos;t just look good on a shelf — but
                actually served a purpose.
              </p>
              <p>
                Over time, we upgraded our tools, refined our techniques, and
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

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-border">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-primary">P</span>
                </div>
                <p className="text-xs text-muted-foreground tracking-wider uppercase">
                  Since 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
