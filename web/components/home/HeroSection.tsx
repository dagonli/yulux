import { SmartImage } from "@/components/shared/SmartImage";
import Link from "next/link";
import { HERO } from "@/content/home";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center" aria-label="Yulux Sign - Custom LED Neon Signs and 3D Channel Letters">
      <SmartImage
        src={HERO.image}
        alt={HERO.imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          {HERO.h1}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{HERO.subhead}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          {HERO.ctas.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className={cta.variant === "primary" ? "btn-primary text-center" : "btn-secondary text-center"}
            >
              {cta.label}
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">{HERO.trustStrip}</p>
      </div>
    </section>
  );
}
