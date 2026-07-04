"use client";

import Link from "next/link";
import { CUSTOMIZER_HEADER } from "@/content/customizer";
import { MaterialQuality } from "@/components/shared/MaterialQuality";
import { HowItWorks } from "@/components/shared/HowItWorks";
import { InquiryForm } from "@/components/forms/InquiryForm";

const LOGO_FIELDS = [
  { id: "logo", label: "Upload Your Logo/Design", type: "file", required: true },
  { id: "size", label: "Estimated Size", type: "text", required: true, placeholder: "e.g., 50cm, 100cm, 2ft" },
  { id: "lighting", label: "Lighting Style", type: "select", required: true, options: ["Standard Neon Sign", "Front-lit", "Back-lit", "Side-lit"] },
  { id: "environment", label: "Installation Environment", type: "select", required: true, options: ["Indoor", "Outdoor Waterproof"] },
  { id: "deadline", label: "Required Deadline", type: "date", required: true },
  { id: "message", label: "Message / Specifications", type: "textarea", placeholder: "Specific color matching, backing material requests, wall mounting surface type..." },
  { id: "name", label: "Full Name", type: "text", required: true },
  { id: "email", label: "Email Address", type: "email", required: true },
  { id: "company", label: "Company Name", type: "text" },
  { id: "country", label: "Country/Region", type: "text", required: true },
];

export function LogoInquiryPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-6 flex gap-2 rounded-full border border-card-border bg-card p-1 w-fit">
          <Link href="/custom-neon-signs" className="rounded-full px-4 py-2 text-sm text-muted hover:text-foreground">
            ✍️ Design Your Text Neon
          </Link>
          <span className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">📤 Upload Your Logo Neon</span>
        </div>

        <h1 className="text-3xl font-bold md:text-4xl">{CUSTOMIZER_HEADER.h1}</h1>
        <p className="mt-4 max-w-3xl text-muted">{CUSTOMIZER_HEADER.h2}</p>

        <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-4 text-center">
          <p className="text-lg font-semibold text-accent">Get a Free Quote within 24h</p>
        </div>

        <div className="mt-10 max-w-2xl">
          <InquiryForm fields={LOGO_FIELDS} submitLabel="Submit Inquiry" />
        </div>
      </div>
      <MaterialQuality />
      <HowItWorks />
    </>
  );
}
