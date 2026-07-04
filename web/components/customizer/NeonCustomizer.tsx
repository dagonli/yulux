"use client";

import { useState } from "react";
import Link from "next/link";
import {
  NEON_COLORS,
  BACKING_OPTIONS,
  ENVIRONMENT_OPTIONS,
  CUSTOMIZER_HEADER,
  CUSTOMIZER_SEO_TEXT,
} from "@/content/customizer";
import { calculateMockPrice } from "@/lib/pricing-mock";
import { useCart } from "@/lib/cart-context";
import { MaterialQuality } from "@/components/shared/MaterialQuality";
import { HowItWorks } from "@/components/shared/HowItWorks";

export function NeonCustomizer() {
  const [text, setText] = useState("Your Text");
  const [fontCategory, setFontCategory] = useState<"script" | "sans" | "retro">("script");
  const [colorId, setColorId] = useState("purple");
  const [backingId, setBackingId] = useState("cut-to-shape");
  const [environmentId, setEnvironmentId] = useState<"indoor" | "outdoor">("indoor");
  const { addItem } = useCart();

  const color = NEON_COLORS.find((c) => c.id === colorId) ?? NEON_COLORS[0];
  const price = calculateMockPrice({ text, fontCategory, colorId, backingId, environmentId });

  const fontFamily =
    fontCategory === "script"
      ? "cursive"
      : fontCategory === "retro"
        ? "monospace"
        : "system-ui, sans-serif";

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-6 flex gap-2 rounded-full border border-card-border bg-card p-1 w-fit">
          <span className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">✍️ Design Your Text Neon</span>
          <Link href="/custom-neon-logo" className="rounded-full px-4 py-2 text-sm text-muted hover:text-foreground">
            📤 Upload Your Logo Neon
          </Link>
        </div>

        <h1 className="text-3xl font-bold md:text-4xl">{CUSTOMIZER_HEADER.h1}</h1>
        <p className="mt-4 max-w-3xl text-muted">{CUSTOMIZER_HEADER.h2}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-card-border bg-black p-8">
            <p
              className={`text-center text-4xl font-bold md:text-5xl ${color.class}`}
              style={{ color: color.hex, fontFamily }}
            >
              {text || "Your Text"}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Step 1: Text Input</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                className="mt-2 w-full rounded-lg border border-card-border bg-background px-4 py-3"
                placeholder="Enter your text..."
              />
            </div>

            <div>
              <label className="text-sm font-medium">Step 2: Font Selection</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["script", "sans", "retro"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFontCategory(cat)}
                    className={`rounded-lg px-4 py-2 text-sm capitalize ${fontCategory === cat ? "bg-accent text-white" : "border border-card-border"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Step 3: Color</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {NEON_COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setColorId(c.id)}
                    title={c.label}
                    className={`h-8 w-8 rounded-full border-2 ${colorId === c.id ? "border-accent scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Step 4: Backing Shape</label>
              <div className="mt-2 space-y-2">
                {BACKING_OPTIONS.map((b) => (
                  <label key={b.id} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="backing" checked={backingId === b.id} onChange={() => setBackingId(b.id)} />
                    <span className="text-sm">{b.label} — {b.description}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Step 5: Environment</label>
              <div className="mt-2 flex gap-4">
                {ENVIRONMENT_OPTIONS.map((e) => (
                  <label key={e.id} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="env" checked={environmentId === e.id} onChange={() => setEnvironmentId(e.id as "indoor" | "outdoor")} />
                    <span className="text-sm">{e.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
              <p className="text-sm text-muted">Instant Pricing</p>
              <p className="text-3xl font-bold text-accent">${price}</p>
              <button
                className="btn-primary mt-4 w-full"
                onClick={() =>
                  addItem({
                    id: `custom-${text}-${colorId}`,
                    name: `Custom Neon: "${text}"`,
                    price,
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-muted">{CUSTOMIZER_SEO_TEXT}</p>
      </div>
      <MaterialQuality />
      <HowItWorks />
    </>
  );
}
