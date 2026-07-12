import type { Metadata } from "next";
import Link from "next/link";
import { SmartImage } from "@/components/shared/SmartImage";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { InquiryForm, QUOTE_FORM_FIELDS } from "@/components/forms/InquiryForm";
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

        <section className="mt-16">
          <h2 className="text-2xl font-bold">The Craftsmanship Lab</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TECHNIQUES.map((tech) => (
              <Link
                key={tech.slug}
                href={`/channel-letters/${tech.slug}`}
                className="group rounded-xl border border-card-border bg-card overflow-hidden transition hover:border-accent/50"
              >
                <div className="relative aspect-video bg-gradient-to-br from-neon-purple/20 to-card">
                  <SmartImage src="/images/image3.webp" alt={tech.label} fill className="object-cover opacity-60" sizes="33vw" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold group-hover:text-accent">{tech.label}</h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{tech.craft}</p>
                  <span className="mt-3 inline-block text-sm text-accent">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Get a Quote</h2>
            <p className="mt-2 text-muted">Free professional mockup within 24 hours.</p>
          </div>
          <InquiryForm inquiryType="QUOTE" fields={QUOTE_FORM_FIELDS} submitLabel="Get a Free Quote" />
        </section>
      </div>
    </>
  );
}
