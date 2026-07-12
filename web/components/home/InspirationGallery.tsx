"use client";

import { SmartImage } from "@/components/shared/SmartImage";
import Link from "next/link";
import { useState } from "react";
import { INSPIRATION_GALLERY } from "@/content/home";

export function InspirationGallery() {
  const [active, setActive] = useState("all");
  const filtered =
    active === "all"
      ? INSPIRATION_GALLERY.items
      : INSPIRATION_GALLERY.items.filter((i) => i.category === active);

  return (
    <section className="section-padding" aria-label="Inspiration Gallery">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">{INSPIRATION_GALLERY.h2}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">{INSPIRATION_GALLERY.subhead}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActive("all")}
            className={`rounded-full px-4 py-2 text-sm ${active === "all" ? "bg-accent text-white" : "bg-card border border-card-border text-muted"}`}
          >
            All
          </button>
          {INSPIRATION_GALLERY.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`rounded-full px-4 py-2 text-sm ${active === cat.id ? "bg-accent text-white" : "bg-card border border-card-border text-muted"}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((item) => (
            <Link key={item.id} href={item.href} className="group relative aspect-square overflow-hidden rounded-xl">
              <SmartImage src={item.image} alt={item.alt} fill loading="lazy" className="object-cover transition group-hover:scale-105" sizes="25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition group-hover:opacity-100 flex items-end p-4">
                <p className="text-xs text-white/90">{item.alt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href={INSPIRATION_GALLERY.viewAll.href} className="btn-secondary">
            {INSPIRATION_GALLERY.viewAll.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
