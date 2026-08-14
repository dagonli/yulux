"use client";

import Link from "next/link";
import { useResolvedImage } from "@/lib/site-images-context";

type CtaBannerProps = {
  h2: string;
  subhead?: string;
  cta: { label: string; href: string };
  /** Optional background image path; defaults to the shared CTA background. */
  bgImage?: string;
  ariaLabel?: string;
};

export function CtaBanner({ h2, subhead, cta, bgImage = "/images/cta-background.webp", ariaLabel }: CtaBannerProps) {
  const bg = useResolvedImage(bgImage);
  return (
    <section
      className="relative overflow-hidden py-24 text-center"
      aria-label={ariaLabel ?? h2}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('${bg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative mx-auto max-w-3xl px-4">
        <h2 className="text-4xl font-bold text-white md:text-5xl">{h2}</h2>
        {subhead && <p className="mt-5 text-lg text-white/80">{subhead}</p>}
        <Link
          href={cta.href}
          className="mt-10 inline-block rounded-lg bg-accent px-10 py-4 text-lg font-bold text-white transition hover:bg-accent-hover"
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
}
