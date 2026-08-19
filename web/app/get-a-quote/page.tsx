import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { QuoteFormSection } from "@/components/forms/QuoteFormSection";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Get a Free Quote | Yulux Sign",
  description:
    "Request a free custom signage quote and professional mockup within 24 hours. Custom neon signs, channel letters, and lightbox solutions.",
  path: "/get-a-quote",
});

export default function GetAQuotePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Get a Quote" }]} />
      <QuoteFormSection />
    </>
  );
}
