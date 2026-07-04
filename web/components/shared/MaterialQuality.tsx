import { MATERIAL_QUALITY } from "@/content/site";

export function MaterialQuality() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Material & Quality</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Engineering-grade materials that justify every investment in your brand.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {MATERIAL_QUALITY.map((item) => (
            <div key={item.title} className="rounded-xl border border-card-border bg-card overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-neon-purple/20 to-card flex items-center justify-center">
                <span className="text-4xl opacity-50">✨</span>
              </div>
              <div className="p-6">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-accent">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
