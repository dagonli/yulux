"use client";

import { useRef, useState } from "react";

type Field = {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

export function InquiryForm({
  fields,
  submitLabel = "Submit Inquiry",
  onSuccess,
  dark = false,
}: {
  fields: Field[];
  submitLabel?: string;
  onSuccess?: () => void;
  dark?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [fileNames, setFileNames] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return (
      <div className={`rounded-xl border p-8 text-center ${dark ? "border-accent/30 bg-accent/5" : "border-card-border bg-card"}`}>
        <p className="text-2xl font-bold text-accent">Thank You!</p>
        <p className="mt-3 text-muted">
          We&apos;ve received your request. Our senior design team will contact you within 24 hours with a free professional mockup and custom quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 rounded-xl border p-6 ${dark ? "border-card-border bg-card/80" : "border-card-border bg-card"}`}>
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} id={field.type === "radio" ? `${field.id}-label` : undefined} className="block text-sm font-medium mb-1">
            {field.label}{field.required && " *"}
          </label>
          {field.type === "select" ? (
            <select
              id={field.id}
              required={field.required}
              className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
            >
              <option value="">Select...</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              id={field.id}
              required={field.required}
              placeholder={field.placeholder}
              rows={4}
              className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
            />
          ) : field.type === "file" ? (
            <>
              <input
                ref={(el) => {
                  fileInputRefs.current[field.id] = el;
                }}
                id={field.id}
                name={field.id}
                type="file"
                accept=".jpg,.jpeg,.png,.svg,.pdf,.ai,.dxf,.webp"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFileNames((prev) => ({
                    ...prev,
                    [field.id]: file?.name ?? "",
                  }));
                }}
              />
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRefs.current[field.id]?.click()}
                  className="rounded bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-hover"
                >
                  Choose File
                </button>
                <span className="text-sm text-muted">
                  {fileNames[field.id] || "No file chosen"}
                </span>
              </div>
              {field.placeholder && (
                <p className="mt-1 text-xs text-muted">{field.placeholder}</p>
              )}
            </>
          ) : field.type === "radio" ? (
            <div className="flex flex-wrap gap-4" role="radiogroup" aria-labelledby={`${field.id}-label`}>
              {field.options?.map((opt) => (
                <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    id={`${field.id}-${opt.toLowerCase()}`}
                    name={field.id}
                    type="radio"
                    value={opt}
                    required={field.required}
                    className="h-4 w-4 accent-accent"
                  />
                  {opt}
                </label>
              ))}
            </div>
          ) : (
            <input
              id={field.id}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm"
            />
          )}
        </div>
      ))}
      <button type="submit" className="btn-primary w-full">{submitLabel}</button>
    </form>
  );
}

export const QUOTE_FORM_FIELDS: Field[] = [
  {
    id: "customerType",
    label: "Customer Type",
    type: "radio",
    required: true,
    options: ["Individual", "Business"],
  },
  { id: "name", label: "Full Name", type: "text", required: true },
  { id: "email", label: "Email Address", type: "email", required: true },
  { id: "company", label: "Company Name", type: "text" },
  { id: "country", label: "Country/Region", type: "text", required: true },
  {
    id: "projectType",
    label: "Project Type",
    type: "select",
    required: true,
    options: ["Custom Neon Sign", "Channel Letters", "Lightbox", "Logo Neon", "Other"],
  },
  {
    id: "message",
    label: "Project Details",
    type: "textarea",
    required: true,
    placeholder: "Tell us about your project, size, colors, and installation environment...",
  },
  {
    id: "image",
    label: "Upload Your Image",
    type: "file",
    placeholder: "Supported formats: JPG, PNG, SVG, PDF, AI, DXF, and WEBP",
  },
];
