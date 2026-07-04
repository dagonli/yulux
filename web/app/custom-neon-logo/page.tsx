import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { LogoInquiryPage } from "@/components/customizer/LogoInquiryPage";
import { buildMetadata } from "@/lib/metadata";
import { LOGO_META } from "@/content/customizer";

export const metadata: Metadata = buildMetadata({
  ...LOGO_META,
  path: "/custom-neon-logo",
});

export default function CustomNeonLogoPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Custom Neon Logo" }]} />
      <LogoInquiryPage />
    </>
  );
}
