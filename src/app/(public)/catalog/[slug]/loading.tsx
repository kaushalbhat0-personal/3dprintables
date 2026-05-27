export default function ProductLoading() {
  return (
    <article className="pb-20 md:pb-0">
      <section className="pt-20 md:pt-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="aspect-[4/3] lg:aspect-square rounded-2xl bg-zinc-800 animate-pulse" />
            <div className="py-8 lg:py-16 space-y-4">
              <div className="h-6 w-32 bg-zinc-800 rounded-full animate-pulse" />
              <div className="h-10 w-3/4 bg-zinc-800 rounded-xl animate-pulse" />
              <div className="h-5 w-full bg-zinc-800/60 rounded-lg animate-pulse" />
              <div className="h-5 w-2/3 bg-zinc-800/60 rounded-lg animate-pulse" />
              <div className="mt-8 grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-20 bg-zinc-800 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
