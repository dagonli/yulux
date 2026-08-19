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
  CUSTOM_NEON_QUOTE_FIELDS,
  CUSTOM_NEON_QUOTE_NOTE,
  CUSTOM_NEON_QUOTE_SUCCESS,
} from "@/content/customizer";
import { MaterialQuality } from "@/components/shared/MaterialQuality";
import { HowItWorks } from "@/components/shared/HowItWorks";
import { InquiryForm, type Field } from "@/components/forms/InquiryForm";

function getDynamicFontSize(text: string): number {
  const len = text.length;
  if (len <= 3) return 96;
  if (len <= 5) return 80;
  if (len <= 10) return 64;
  if (len <= 20) return 48;
  if (len <= 40) return 36;
  return 28;
}

export function NeonCustomizer() {
  const [text, setText] = useState("Your Text");
  const [fontId, setFontId] = useState<string>("great-vibes");
  const [colorId, setColorId] = useState("purple");
  const [backingId, setBackingId] = useState("cut-to-shape");
  const [environmentId, setEnvironmentId] = useState<"indoor" | "outdoor">("indoor");
  const [bgId, setBgId] = useState("black");
  const [openStep, setOpenStep] = useState<number | null>(1);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const color = NEON_COLORS.find((c) => c.id === colorId) ?? NEON_COLORS[0];
  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const bg = PREVIEW_BACKGROUNDS.find((b) => b.id === bgId) ?? PREVIEW_BACKGROUNDS[0];

  // 询价表单字段 = 联系方式字段 + 隐藏的设计选项（落入后端 payload）
  const quoteFields: Field[] = [
    ...CUSTOM_NEON_QUOTE_FIELDS,
    { id: "customText", label: "", type: "hidden", defaultValue: text },
    { id: "fontId", label: "", type: "hidden", defaultValue: fontId },
    { id: "colorId", label: "", type: "hidden", defaultValue: colorId },
    { id: "backingId", label: "", type: "hidden", defaultValue: backingId },
    { id: "environmentId", label: "", type: "hidden", defaultValue: environmentId },
  ];

  const previewStyle = useMemo(() => {
    const fontSize = getDynamicFontSize(text || "Your Text");
    return {
      color: color.hex,
      fontFamily: font.family,
      fontSize: `${fontSize}px`,
      textShadow: `0 0 10px ${color.hex}, 0 0 20px ${color.hex}, 0 0 40px ${color.hex}, 0 0 80px ${color.hex}88, 0 0 120px ${color.hex}44`,
      filter: `drop-shadow(0 0 15px ${color.hex}66) drop-shadow(0 0 30px ${color.hex}33)`,
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
            className="rounded-full px-4 py-2 text-sm text-white hover:text-white transition"
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
              className={`relative flex min-h-[320px] items-center justify-center rounded-xl border border-card-border p-8 transition overflow-hidden ${bg.class}`}
              style={{
                boxShadow: `inset 0 0 60px ${color.hex}15, 0 0 40px ${color.hex}10`,
              }}
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
              <p className="text-sm font-semibold text-accent">Custom Pricing</p>
              <p className="mt-3 text-sm text-foreground">
                <span className="font-medium">No payment required.</span> We&apos;ll confirm your options and final price by email.
              </p>
              <p className="mt-2 text-sm text-muted">
                Price depends on size, design, color, backing and shipping destination.
              </p>
              <button
                className="btn-primary mt-4 w-full"
                onClick={() => setShowQuoteModal(true)}
              >
                Get a Free Quote
              </button>
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-muted">{CUSTOMIZER_SEO_TEXT}</p>
      </div>
      <MaterialQuality />
      <HowItWorks />

      {/* Quote form modal */}
      {showQuoteModal && !showThankYou && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
          onClick={() => setShowQuoteModal(false)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl border border-card-border bg-card shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-card-border px-6 py-4">
              <h2 id="quote-modal-title" className="text-xl font-bold">Get a Free Quote</h2>
              <button
                type="button"
                onClick={() => setShowQuoteModal(false)}
                className="text-muted hover:text-foreground text-2xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              <InquiryForm
                inquiryType="CUSTOM_NEON"
                fields={quoteFields}
                submitLabel="Submit Request"
                twoColumn
                bare
                onSuccess={() => {
                  setShowThankYou(true);
                }}
              />
            </div>
            <p className="shrink-0 border-t border-card-border px-6 py-3 text-center text-xs text-muted">{CUSTOM_NEON_QUOTE_NOTE}</p>
          </div>
        </div>
      )}

      {/* Thank you modal */}
      {showThankYou && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-thankyou-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-card-border bg-card p-8 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 id="quote-thankyou-title" className="text-xl font-bold">{CUSTOM_NEON_QUOTE_SUCCESS.title}</h2>
            <p className="mt-3 text-sm text-muted">{CUSTOM_NEON_QUOTE_SUCCESS.message}</p>
            <button
              type="button"
              onClick={() => {
                setShowThankYou(false);
                setShowQuoteModal(false);
              }}
              className="btn-primary mt-6 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
