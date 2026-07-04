import Image from "next/image";
import { TRUST_BADGES } from "@/content/site";

const BADGE_IMAGES = [
  "/images/trust/badge-design.png",
  "/images/trust/badge-engineering.png",
  "/images/trust/badge-quote.png",
  "/images/trust/badge-revisions.png",
  "/images/trust/badge-shipping.png",
  "/images/trust/badge-warranty.png",
];

export function TrustBadges({ h2, seoText }: { h2: string; seoText?: string }) {
  return (
    <section className="section-padding bg-card/50">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">{h2}</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_BADGES.map((badge, i) => (
            <div key={badge.title} className="flex items-start gap-4 rounded-xl border border-card-border bg-card p-6">
              <div className="relative h-14 w-14 shrink-0">
                <Image
                  src={BADGE_IMAGES[i]}
                  alt={badge.title}
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              </div>
              <div>
                <h3 className="font-semibold">{badge.title}</h3>
                <p className="mt-1 text-sm text-muted">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
        {seoText && (
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-muted">{seoText}</p>
        )}
      </div>
    </section>
  );
}
