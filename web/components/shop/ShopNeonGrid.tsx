"use client";

import { SmartImage } from "@/components/shared/SmartImage";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/content/products";

const PRODUCT_IMAGES: Record<string, { white: string; pink: string }> = {
  "better-together-wedding-neon-sign": {
    white: "/images/products/better-together-white-main.webp",
    pink: "/images/products/better-together-pink-main.webp",
  },
  "cheers-neon-bar-sign": {
    white: "/images/products/cheers-white-main.webp",
    pink: "/images/products/cheers-pink-main.webp",
  },
  "good-vibes-only-neon-sign": {
    white: "/images/products/good-vibes-white-main.webp",
    pink: "/images/products/good-vibes-pink-main.webp",
  },
  "this-must-be-the-place-neon-sign": {
    white: "/images/products/this-must-be-white-main.webp",
    pink: "/images/products/this-must-be-pink-main.webp",
  },
};

export function ShopNeonGrid({ products }: { products: Product[] }) {
  const [activeColor, setActiveColor] = useState<Record<string, "white" | "pink">>({});

  const getColor = (slug: string) => activeColor[slug] ?? "white";
  const getImage = (slug: string) =>
    PRODUCT_IMAGES[slug]?.[getColor(slug)] ?? products.find((p) => p.slug === slug)?.image ?? "";

  return (
    <>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {products.map((product) => {
          const color = getColor(product.slug);
          return (
            <div
              key={product.slug}
              className="group overflow-hidden rounded-xl border border-card-border bg-card transition hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <SmartImage
                  src={getImage(product.slug)}
                  alt={product.alt}
                  fill
                  loading="lazy"
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <button
                    onClick={() => setActiveColor((prev) => ({ ...prev, [product.slug]: "white" }))}
                    title="Warm White"
                    className={`h-7 w-7 rounded-full border-2 shadow transition ${color === "white" ? "border-accent scale-110" : "border-white/60"}`}
                    style={{ background: "#FFF8E7" }}
                  />
                  <button
                    onClick={() => setActiveColor((prev) => ({ ...prev, [product.slug]: "pink" }))}
                    title="Pink"
                    className={`h-7 w-7 rounded-full border-2 shadow transition ${color === "pink" ? "border-accent scale-110" : "border-white/60"}`}
                    style={{ background: "#FF69B4" }}
                  />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">{product.name}</h2>
                  <span className="text-xl font-bold text-accent">${product.price}</span>
                </div>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-4 block w-full rounded-lg bg-accent py-3 text-center text-sm font-bold text-white transition hover:bg-accent-hover"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coming Soon */}
      <div className="mt-20 rounded-2xl border border-card-border bg-card/50 py-14 px-6 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">More Designs, Coming Soon.</h2>
        <p className="mt-3 text-sm" style={{ color: "#aaa", fontSize: 14 }}>
          Drop your email to get notified when new premium signs drop.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <input
            type="email"
            required
            placeholder="请输入您的邮箱"
            className="w-full max-w-xs rounded-lg border border-card-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none sm:w-72"
          />
          <button
            type="submit"
            className="rounded-lg bg-accent px-8 py-3 text-sm font-bold text-white transition hover:bg-accent-hover"
          >
            Notify Me
          </button>
        </form>
      </div>
    </>
  );
}
