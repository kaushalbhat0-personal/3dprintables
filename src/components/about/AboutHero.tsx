export function AboutHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-primary bg-primary/10 border border-primary/20 rounded-full">
            Our Story
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Crafted{" "}
            <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">
              Layer By Layer
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            What started as a small workshop experiment has grown into a studio
            obsessed with precision, quality, and the art of 3D printing. We
            don&apos;t just print plastic — we bring ideas to life.
          </p>
        </div>
      </div>
    </section>
  )
}
