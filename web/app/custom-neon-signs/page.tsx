import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { NeonCustomizer } from "@/components/customizer/NeonCustomizer";
import { YuluxAdvantage } from "@/components/shared/YuluxAdvantage";
import { FAQ } from "@/components/shared/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/metadata";
import { CUSTOMIZER_META, CUSTOM_NEON_FAQ } from "@/content/customizer";

export const metadata: Metadata = buildMetadata({
  ...CUSTOMIZER_META,
  path: "/custom-neon-signs",
});

export default function CustomNeonSignsPage() {
  return (
    <>
      <JsonLd data={[faqSchema(CUSTOM_NEON_FAQ.items)]} />
      <Breadcrumb items={[{ label: "Custom Neon Signs" }]} />
      <NeonCustomizer />
      <YuluxAdvantage />
      <FAQ h2={CUSTOM_NEON_FAQ.h2} items={CUSTOM_NEON_FAQ.items} />
    </>
  );
}
