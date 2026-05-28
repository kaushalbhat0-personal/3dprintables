export function ContactHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[140px]" />
      </div>

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-primary bg-primary/10 border border-primary/20 rounded-full">
            Get In Touch
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 bg-clip-text text-transparent text-glow-amber">
              Create Together
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Got an idea, a sketch, or just a question? We&apos;re here to help.
            Reach out and we&apos;ll get back to you within hours, not days.
          </p>
        </div>
      </div>
    </section>
  )
}
