import { SmartImage } from "@/components/shared/SmartImage";
import Link from "next/link";
import { PRODUCT_FINDER } from "@/content/home";

export function ProductFinder() {
  return (
    <section className="section-padding" aria-label="What Are You Looking For">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">{PRODUCT_FINDER.h2}</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_FINDER.cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-card-border bg-card overflow-hidden transition hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="relative aspect-square overflow-hidden">
                <SmartImage
                  src={card.image}
                  alt={card.alt}
                  fill
                  loading="lazy"
                  className="object-cover transition group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 20vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold uppercase tracking-wide">{card.title}</h3>
                <p className="mt-2 text-sm text-muted line-clamp-3">{card.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent group-hover:underline">
                  {card.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
