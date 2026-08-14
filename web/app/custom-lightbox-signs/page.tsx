import type { Metadata } from "next";
import { SmartImage } from "@/components/shared/SmartImage";
import { AutoScrollGallery } from "@/components/shared/AutoScrollGallery";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FAQ } from "@/components/shared/FAQ";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { MaterialSpecifications } from "@/components/shared/MaterialSpecifications";
import { HowItWorks } from "@/components/shared/HowItWorks";
import { PrecisionManufacturing } from "@/components/shared/PrecisionManufacturing";
import { LogisticsInstallation } from "@/components/shared/LogisticsInstallation";
import { B2BEngineeringFAQ } from "@/components/shared/B2BEngineeringFAQ";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";
import {
  LIGHTBOX_META,
  LIGHTBOX_HERO,
  LIGHTBOX_CAPABILITIES,
  LIGHTBOX_FAQ,
  LIGHTBOX_FORM_FIELDS,
  LIGHTBOX_CTA,
} from "@/content/lightbox";

const CAPABILITY_IMAGES = [
  "/images/lightbox/yulux_macro_shapes.png",
  "/images/lightbox/yulux_macro_materials.png",
  "/images/lightbox/yulux_macro_illumination.png",
] as const;

const GALLERY_IMAGES = [
  { src: "/images/lightbox/yulux_lightbox_frameless.png", alt: "Bespoke custom lightbox sign glowing at night for luxury retail storefront" },
  { src: "/images/lightbox/yulux_macro_shapes.png", alt: "Custom lightbox macro detail — architectural shapes" },
  { src: "/images/lightbox/yulux_macro_materials.png", alt: "Custom lightbox macro detail — premium materials" },
  { src: "/images/lightbox/yulux_macro_illumination.png", alt: "Custom lightbox macro detail — illumination aesthetics" },
];

export const metadata: Metadata = buildMetadata({
  ...LIGHTBOX_META,
  path: "/custom-lightbox-signs",
});

export default function LightboxPage() {
  return (
    <>
      <JsonLd data={faqSchema(LIGHTBOX_FAQ)} />
      <Breadcrumb items={[{ label: "Custom Lightbox Signs" }]} />
      <div className="bg-[#050508]">
        <section id="get-a-quote" className="mx-auto max-w-7xl px-4 py-16 lg:px-8 scroll-mt-24">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="relative aspect-[16/10] lg:h-full lg:min-h-[560px]">
                <AutoScrollGallery images={GALLERY_IMAGES} />
              </div>
            </div>
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold md:text-4xl">{LIGHTBOX_HERO.h1}</h1>
              <p className="mt-4 text-muted">{LIGHTBOX_HERO.h4}</p>
              <div className="mt-8">
                <InquiryForm
                  inquiryType="LIGHTBOX"
                  fields={LIGHTBOX_FORM_FIELDS}
                  submitLabel={LIGHTBOX_HERO.cta}
                  dark
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding border-t border-white/5">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-3xl font-bold">Custom Capabilities Showcase</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {LIGHTBOX_CAPABILITIES.map((cap, i) => (
                <div key={cap.title} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <SmartImage
                      src={CAPABILITY_IMAGES[i] || "/images/lightbox/yulux_macro_shapes.png"}
                      alt={cap.title}
                      fill
                      className="object-cover"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold">{cap.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MaterialSpecifications />
        <HowItWorks />
        <PrecisionManufacturing />
        <LogisticsInstallation />
        <B2BEngineeringFAQ />

        <FAQ h2="Technical FAQ" items={LIGHTBOX_FAQ} />

        <CtaBanner h2={LIGHTBOX_CTA.h2} cta={LIGHTBOX_CTA.cta} ariaLabel="Get free design" />
      </div>
    </>
  );
}
