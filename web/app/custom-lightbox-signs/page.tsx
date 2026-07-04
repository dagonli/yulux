import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FAQ } from "@/components/shared/FAQ";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";
import {
  LIGHTBOX_META,
  LIGHTBOX_HERO,
  LIGHTBOX_CAPABILITIES,
  LIGHTBOX_FAQ,
  LIGHTBOX_FORM_FIELDS,
} from "@/content/lightbox";

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
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/images/image5.png"
                  alt="Bespoke custom lightbox sign glowing at night for luxury retail storefront"
                  fill
                  priority
                  className="object-cover"
                  sizes="60vw"
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold md:text-4xl">{LIGHTBOX_HERO.h1}</h1>
              <p className="mt-4 text-muted">{LIGHTBOX_HERO.h4}</p>
              <div className="mt-8">
                <InquiryForm
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
              {LIGHTBOX_CAPABILITIES.map((cap) => (
                <div key={cap.title} className="rounded-xl border border-white/10 bg-white/5 p-8">
                  <h3 className="text-xl font-semibold">{cap.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQ h2="Technical FAQ" items={LIGHTBOX_FAQ} />
      </div>
    </>
  );
}
