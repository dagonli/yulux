import type { Metadata } from "next";
import { ImageCarousel } from "@/components/shared/ImageCarousel";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FAQ } from "@/components/shared/FAQ";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { MaterialSpecifications } from "@/components/shared/MaterialSpecifications";
import { HowItWorks } from "@/components/shared/HowItWorks";
import { PrecisionManufacturing } from "@/components/shared/PrecisionManufacturing";
import { ScrollCta } from "@/components/shared/ScrollCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";
import {
  LIGHTBOX_META,
  LIGHTBOX_HERO,
  LIGHTBOX_FAQ,
  LIGHTBOX_FORM_FIELDS,
  LIGHTBOX_CTA,
} from "@/content/lightbox";

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
            <div className="lg:col-span-3 lg:flex lg:items-center">
              <ImageCarousel images={GALLERY_IMAGES} />
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
                  twoColumn
                />
              </div>
            </div>
          </div>
        </section>

        <MaterialSpecifications slot="lightbox-materials" />
        <HowItWorks />
        <PrecisionManufacturing />

        <FAQ h2="Technical FAQ" items={LIGHTBOX_FAQ} />

        <ScrollCta h2={LIGHTBOX_CTA.h2} label={LIGHTBOX_CTA.cta.label} />
      </div>
    </>
  );
}
