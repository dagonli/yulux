import type { Metadata } from "next";
import { SmartImage } from "@/components/shared/SmartImage";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ChannelLettersInquiryForm } from "@/components/forms/ChannelLettersInquiryForm";
import { MaterialSpecifications } from "@/components/shared/MaterialSpecifications";
import { HowItWorks } from "@/components/shared/HowItWorks";
import { PrecisionManufacturing } from "@/components/shared/PrecisionManufacturing";
import { LogisticsInstallation } from "@/components/shared/LogisticsInstallation";
import { B2BEngineeringFAQ } from "@/components/shared/B2BEngineeringFAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { HUB_META, HUB_CONTENT, TECHNIQUES } from "@/content/channel-letters";
import { SITE } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  ...HUB_META,
  path: "/channel-letters-logos",
});

export default function ChannelLettersHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Business Signs", url: `${SITE.url}/channel-letters-logos` },
        ])}
      />
      <Breadcrumb items={[{ label: "Business Signs" }]} />
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <h1 className="text-4xl font-bold md:text-5xl">{HUB_CONTENT.h1}</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted">{HUB_CONTENT.subhead}</p>

        {/* Quote Form */}
        <section id="get-a-quote" className="mt-16 grid gap-10 lg:grid-cols-2 scroll-mt-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-auto">
            <SmartImage
              src="/images/lightbox/yulux_lightbox_frameless.png"
              alt="Yulux channel letters craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Get a Quote</h2>
            <p className="mt-2 text-muted">Free professional mockup within 24 hours.</p>
            <div className="mt-6">
              <ChannelLettersInquiryForm />
            </div>
          </div>
        </section>

        {/* Craftsmanship Lab - 6 cards without links */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">The Craftsmanship Lab</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TECHNIQUES.map((tech) => (
              <div
                key={tech.slug}
                className="group rounded-xl border border-card-border bg-card overflow-hidden"
              >
                <div className="relative aspect-video bg-gradient-to-br from-neon-purple/20 to-card">
                  <SmartImage
                    src={`/images/craft-${tech.slug}.webp`}
                    alt={tech.label}
                    fill
                    className="object-cover opacity-60"
                    sizes="33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{tech.label}</h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{tech.craft}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <MaterialSpecifications />
      <HowItWorks />
      <PrecisionManufacturing />
      <LogisticsInstallation />
      <B2BEngineeringFAQ />
    </>
  );
}
