"use client";

import { useState, useRef } from "react";
import { submitInquiry } from "@/lib/api";

const PROJECT_TYPES = [
  "Custom Neon Signs",
  "3D Channel Letters / Lighted Words",
  "Lightbox Signs",
  "Entire Store / Business Signage Project",
  "Other / Not Sure",
];

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [customerType, setCustomerType] = useState<"Individual" | "Business">("Individual");
  const [fileName, setFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const file = fileInputRef.current?.files?.[0] ?? null;
    try {
      await submitInquiry({
        type: "QUOTE",
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        company: String(form.get("company") ?? ""),
        country: String(form.get("country") ?? ""),
        message: String(form.get("message") ?? ""),
        payload: { customerType, projectType },
        sourcePage: typeof window !== "undefined" ? window.location.pathname : undefined,
        file,
      });
      setSubmitted(true);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setFileName("");
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
          We&apos;ve received your request. Our senior design team will contact you within 24 hours with a free
          professional mockup and custom quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Customer Type */}
      <div>
        <label className="block text-sm font-medium mb-2">Customer Type</label>
        <div className="grid grid-cols-2 gap-3">
          {(["Individual", "Business"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setCustomerType(type)}
              className={`flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium transition ${
                customerType === type
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-card-border bg-background text-muted hover:border-accent/50"
              }`}
            >
              <span>{type === "Individual" ? "👤" : "🏢"}</span>
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Name + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter your full name"
            className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email address"
            className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
          />
        </div>
      </div>

      {/* Company + Country */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1">Company Name</label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Enter your company name (optional)"
            className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1">Country / Region *</label>
          <input
            id="country"
            name="country"
            type="text"
            required
            placeholder="Select your country or region"
            className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
          />
        </div>
      </div>

      {/* Project Type — pill selector */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Project Type <span className="text-accent font-semibold">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setProjectType(type)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                projectType === type
                  ? "border-accent bg-accent text-white"
                  : "border-card-border bg-background text-muted hover:border-accent/50 hover:text-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <input type="hidden" name="projectType" value={projectType} required />
      </div>

      {/* Project Details */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">Project Details *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Tell us about your project, size, colors, and installation environment..."
          className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
        />
      </div>

      {/* File upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload Your Image</label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.tiff,.ai,.pdf"
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
        <p className="mt-1 text-xs text-muted">Supported formats: JPG, PNG, JPEG, TIFF, AI, PDF</p>
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-400">
          {error}
        </p>
      )}
      <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-base disabled:opacity-60">
        {submitting ? "Submitting…" : "Get My Free Quote →"}
      </button>
      <p className="text-center text-xs text-muted">🔒 Your information is secure and will not be shared.</p>
    </form>
  );
}
