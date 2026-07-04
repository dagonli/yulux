import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { NeonCustomizer } from "@/components/customizer/NeonCustomizer";
import { buildMetadata } from "@/lib/metadata";
import { CUSTOMIZER_META } from "@/content/customizer";

export const metadata: Metadata = buildMetadata({
  ...CUSTOMIZER_META,
  path: "/custom-neon-signs",
});

export default function CustomNeonSignsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Custom Neon Signs" }]} />
      <NeonCustomizer />
    </>
  );
}
