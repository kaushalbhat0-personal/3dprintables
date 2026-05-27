export default function CatalogLoading() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center">
            <div className="h-12 w-72 bg-zinc-800 rounded-xl mx-auto animate-pulse" />
            <div className="mt-4 h-6 w-96 max-w-full bg-zinc-800/60 rounded-lg mx-auto animate-pulse" />
            <div className="mt-10 flex items-center justify-center gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 w-24 bg-zinc-800 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="pb-20 md:pb-28">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border overflow-hidden">
                <div className="aspect-[4/5] bg-zinc-800 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-3/4 bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-zinc-800/60 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-zinc-800/60 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
