"use client";

import Link from "next/link";
import { FINAL_CTA } from "@/content/home";
import { useResolvedImage } from "@/lib/site-images-context";

export function FinalCTA() {
  const bg = useResolvedImage("/images/cta-background.webp");
  return (
    <section
      className="relative overflow-hidden py-24 text-center"
      aria-label="Ready to Illuminate Your Brand"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('${bg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative mx-auto max-w-3xl px-4">
        <h2 className="text-4xl font-bold text-white md:text-5xl">{FINAL_CTA.h2}</h2>
        <p className="mt-5 text-lg text-white/80">{FINAL_CTA.subhead}</p>
        <Link
          href={FINAL_CTA.cta.href}
          className="mt-10 inline-block rounded-lg bg-accent px-10 py-4 text-lg font-bold text-white transition hover:bg-accent-hover"
          title="Request a custom signage quote"
        >
          {FINAL_CTA.cta.label}
        </Link>
      </div>
    </section>
  );
}
