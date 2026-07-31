"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  NEON_COLORS,
  BACKING_OPTIONS,
  ENVIRONMENT_OPTIONS,
  CUSTOMIZER_HEADER,
  CUSTOMIZER_SEO_TEXT,
  FONTS,
  PREVIEW_BACKGROUNDS,
} from "@/content/customizer";
import { calculateMockPrice } from "@/lib/pricing-mock";
import { useCart } from "@/lib/cart-context";
import { MaterialQuality } from "@/components/shared/MaterialQuality";
import { HowItWorks } from "@/components/shared/HowItWorks";

function getDynamicFontSize(text: string): number {
  const len = text.length;
  if (len <= 5) return 72;
  if (len <= 10) return 56;
  if (len <= 20) return 40;
  if (len <= 40) return 32;
  return 24;
}

export function NeonCustomizer() {
  const [text, setText] = useState("Your Text");
  const [fontId, setFontId] = useState<string>("great-vibes");
  const [colorId, setColorId] = useState("purple");
  const [backingId, setBackingId] = useState("cut-to-shape");
  const [environmentId, setEnvironmentId] = useState<"indoor" | "outdoor">("indoor");
  const [bgId, setBgId] = useState("black");
  const [openStep, setOpenStep] = useState<number | null>(1);
  const { addItem } = useCart();

  const color = NEON_COLORS.find((c) => c.id === colorId) ?? NEON_COLORS[0];
  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const bg = PREVIEW_BACKGROUNDS.find((b) => b.id === bgId) ?? PREVIEW_BACKGROUNDS[0];
  const price = calculateMockPrice({ text, fontCategory: "script", colorId, backingId, environmentId });

  const previewStyle = useMemo(() => {
    const fontSize = getDynamicFontSize(text || "Your Text");
    return {
      color: color.hex,
      fontFamily: font.family,
      fontSize: `${fontSize}px`,
      textShadow: `0 0 10px ${color.hex}, 0 0 20px ${color.hex}, 0 0 40px ${color.hex}88`,
    };
  }, [text, color, font]);

  const steps = [
    {
      id: 1,
      title: "Text Input",
      content: (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-card-border bg-background px-4 py-3"
          placeholder="Enter your text..."
        />
      ),
    },
    {
      id: 2,
      title: "Font Selection",
      content: (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {FONTS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFontId(f.id)}
              className={`rounded-lg border px-3 py-3 text-sm transition ${
                fontId === f.id
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-card-border hover:border-accent/50"
              }`}
              style={{ fontFamily: f.family }}
              title={f.label}
            >
              {f.label}
            </button>
          ))}
        </div>
      ),
    },
    {
      id: 3,
      title: "Color",
      content: (
        <div className="flex flex-wrap gap-3">
          {NEON_COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => setColorId(c.id)}
              title={c.label}
              className={`h-10 w-10 rounded-full border-2 transition ${
                colorId === c.id ? "border-white scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      ),
    },
    {
      id: 4,
      title: "Backing Shape",
      content: (
        <div className="grid gap-3 sm:grid-cols-3">
          {BACKING_OPTIONS.map((b) => (
            <button
              key={b.id}
              onClick={() => setBackingId(b.id)}
              className={`rounded-xl border p-4 text-left transition ${
                backingId === b.id
                  ? "border-accent bg-accent/10"
                  : "border-card-border hover:border-accent/50"
              }`}
            >
              <span className="text-2xl">
                {b.id === "cut-to-shape" ? "✂️" : b.id === "whole-board" ? "⬜" : "📎"}
              </span>
              <p className="mt-2 font-semibold text-sm">{b.label}</p>
              <p className="mt-1 text-xs text-muted">{b.description}</p>
            </button>
          ))}
        </div>
      ),
    },
    {
      id: 5,
      title: "Environment",
      content: (
        <div className="grid gap-3 sm:grid-cols-2">
          {ENVIRONMENT_OPTIONS.map((e) => (
            <button
              key={e.id}
              onClick={() => setEnvironmentId(e.id as "indoor" | "outdoor")}
              className={`rounded-xl border p-4 text-left transition ${
                environmentId === e.id
                  ? "border-accent bg-accent/10"
                  : "border-card-border hover:border-accent/50"
              }`}
            >
              <span className="text-2xl">{e.id === "indoor" ? "🏠" : "🌧️"}</span>
              <p className="mt-2 font-semibold text-sm">{e.label}</p>
              <p className="mt-1 text-xs text-muted">
                {e.id === "indoor" ? "Standard indoor use" : "IP67 waterproof rating"}
              </p>
            </button>
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {/* Tab switcher */}
        <div className="mb-6 flex gap-2 rounded-full border border-card-border bg-card p-1 w-fit">
          <span className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">
            ✍️ Design Your Text Neon
          </span>
          <Link
            href="/custom-neon-logo"
            className="rounded-full px-4 py-2 text-sm text-white/80 hover:text-white transition"
          >
            📤 Upload Your Logo Neon
          </Link>
        </div>

        <h1 className="text-3xl font-bold md:text-4xl">{CUSTOMIZER_HEADER.h1}</h1>
        <p className="mt-4 max-w-3xl text-muted">{CUSTOMIZER_HEADER.h2}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Preview */}
          <div className="space-y-4">
            <div
              className={`relative flex min-h-[320px] items-center justify-center rounded-xl border border-card-border p-8 transition ${bg.class}`}
            >
              <p
                className="text-center font-bold leading-tight break-words max-w-full"
                style={previewStyle}
              >
                {text || "Your Text"}
              </p>
            </div>
            {/* Background switcher */}
            <div className="flex flex-wrap gap-2">
              {PREVIEW_BACKGROUNDS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBgId(b.id)}
                  className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                    bgId === b.id
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-card-border text-muted hover:text-foreground"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form steps */}
          <div className="space-y-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className="rounded-xl border border-card-border bg-card overflow-hidden"
              >
                <button
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenStep(openStep === step.id ? null : step.id)}
                >
                  <span className="font-semibold">
                    <span className="mr-2 text-accent">Step {step.id}:</span>
                    {step.title}
                  </span>
                  <span className="text-accent text-lg">
                    {openStep === step.id ? "−" : "+"}
                  </span>
                </button>
                {openStep === step.id && (
                  <div className="px-5 pb-4">{step.content}</div>
                )}
              </div>
            ))}

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
