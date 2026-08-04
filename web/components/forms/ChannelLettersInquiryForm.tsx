"use client";

import { useRef, useState } from "react";
import { SmartImage } from "@/components/shared/SmartImage";
import { submitInquiry } from "@/lib/api";

const TECH_OPTIONS = [
  { id: "front-lit", label: "Front-lit" },
  { id: "back-lit", label: "Back-lit" },
  { id: "side-lit", label: "Side-lit" },
  { id: "full-lit", label: "Full-lit" },
  { id: "jelly-lit", label: "Jelly-lit" },
  { id: "non-lit", label: "Non-lit" },
] as const;

export function ChannelLettersInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleTech = (id: string) => {
    setSelectedTech((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const common: Record<string, string> = {};
    const payload: Record<string, string> = {};

    for (const [key, value] of form.entries()) {
      if (value instanceof File) continue;
      if (["name", "email", "phone", "country"].includes(key)) common[key] = value;
      else payload[key] = value;
    }

    if (selectedTech.length > 0) {
      payload.technology = selectedTech.join(", ");
    }
    if (common.phone) {
      payload.phone = common.phone;
    }

    try {
      await submitInquiry({
        type: "QUOTE",
        name: common.name ?? "",
        email: common.email ?? "",
        country: common.country,
        payload,
        sourcePage: typeof window !== "undefined" ? window.location.pathname : undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-8 text-center">
        <p className="text-2xl font-bold text-accent">Thank You!</p>
        <p className="mt-3 text-muted">
          We&apos;ve received your request. Our senior design team will contact you within 24 hours with a free professional mockup and custom quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-card-border bg-card p-6">
      {/* Customer Type */}
      <div>
        <label className="block text-sm font-medium mb-1">Customer Type *</label>
        <div className="flex flex-wrap gap-4" role="radiogroup">
          {["Individual", "Business"].map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm">
              <input name="customerType" type="radio" value={opt} required className="h-4 w-4 accent-accent" />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Upload Image */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload Your Image</label>
        <input
          ref={fileInputRef}
          name="image"
          type="file"
          accept=".jpg,.jpeg,.png,.svg,.pdf,.ai,.dxf,.webp"
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            Choose File
          </button>
          <span className="text-sm text-muted">{fileName || "No file chosen"}</span>
        </div>
      </div>

      {/* Size */}
      <div>
        <label htmlFor="size" className="block text-sm font-medium mb-1">Size *</label>
        <input
          id="size"
          name="size"
          type="text"
          required
          placeholder="e.g., 50cm, 100cm, 2ft"
          className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
        />
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium mb-1">Quantity *</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          required
          min={1}
          placeholder="e.g., 1, 5, 10"
          className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
        />
      </div>

      {/* Project Time */}
      <div>
        <label htmlFor="projectTime" className="block text-sm font-medium mb-1">Project Time *</label>
        <input
          id="projectTime"
          name="projectTime"
          type="text"
          required
          placeholder="e.g., Urgent (1-2 weeks), Standard (3-4 weeks)"
          className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
        />
      </div>

      {/* Technology */}
      <div>
        <label className="block text-sm font-medium mb-2">What technology do you need? *</label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {TECH_OPTIONS.map((tech) => (
            <button
              key={tech.id}
              type="button"
              onClick={() => toggleTech(tech.id)}
              className={`rounded-lg border p-2 text-center text-xs transition ${
                selectedTech.includes(tech.id)
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-card-border text-muted hover:border-accent/50"
              }`}
            >
              <div className="relative mx-auto mb-1 h-10 w-10 overflow-hidden rounded-md bg-gradient-to-br from-neon-purple/30 to-card">
                <SmartImage
                  src={`/images/craft-${tech.id}.webp`}
                  alt={tech.label}
                  fill
                  className="object-cover opacity-70"
                  sizes="40px"
                />
              </div>
              {tech.label}
            </button>
          ))}
        </div>
        <input type="hidden" name="technology" value={selectedTech.join(",")} />
      </div>

      {/* Indoor/Outdoor */}
      <div>
        <label className="block text-sm font-medium mb-1">Is your sign for indoor or outdoor usage? *</label>
        <div className="flex flex-wrap gap-4" role="radiogroup">
          {["Indoor", "Outdoor"].map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm">
              <input name="environment" type="radio" value={opt} required className="h-4 w-4 accent-accent" />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Note */}
      <div>
        <label htmlFor="note" className="block text-sm font-medium mb-1">Note</label>
        <textarea
          id="note"
          name="note"
          rows={3}
          placeholder="Any additional requirements or specifications..."
          className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
        />
      </div>

      {/* Contact Details */}
      <div className="border-t border-card-border pt-4">
        <p className="text-sm font-semibold mb-3">Contact Details</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-1">Country *</label>
            <input
              id="country"
              name="country"
              type="text"
              required
              className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-400">
          {error}
        </p>
      )}

      <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
        {submitting ? "Submitting…" : "Get a Free Quote"}
      </button>
    </form>
  );
}
