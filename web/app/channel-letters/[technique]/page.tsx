import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FAQ } from "@/components/shared/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { getTechnique, TECHNIQUE_SLUGS } from "@/content/channel-letters";
import { SITE } from "@/content/site";

type Props = { params: Promise<{ technique: string }> };

export async function generateStaticParams() {
  return TECHNIQUE_SLUGS.map((technique) => ({ technique }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { technique: slug } = await params;
  const tech = getTechnique(slug);
  if (!tech) return {};
  return buildMetadata({
    title: tech.metaTitle,
    description: tech.metaDescription,
    keywords: tech.keywords,
    path: `/channel-letters/${slug}`,
  });
}

export default async function TechniquePage({ params }: Props) {
  const { technique: slug } = await params;
  const tech = getTechnique(slug);
  if (!tech) notFound();

  const url = `${SITE.url}/channel-letters/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          faqSchema(tech.faq),
          breadcrumbSchema([
            { name: "Home", url: SITE.url },
            { name: "Channel Letters", url: `${SITE.url}/channel-letters-logos` },
            { name: tech.label, url },
          ]),
        ]}
      />
      <Breadcrumb
        items={[
          { label: "Channel Letters", href: "/channel-letters-logos" },
          { label: tech.label },
        ]}
      />
      <article className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <h1 className="text-3xl font-bold md:text-4xl">{tech.h1}</h1>
        <p className="mt-4 text-xl text-muted">{tech.subhead}</p>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">The Craft</h2>
          <p className="mt-4 text-muted leading-relaxed">{tech.craft}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">Why Choose {tech.label}?</h2>
          <p className="mt-4 text-muted">{tech.whyChoose}</p>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/get-a-quote" className="btn-primary">Get a Free Quote</Link>
          <Link href="/channel-letters-logos" className="btn-secondary">View All Techniques</Link>
        </div>
      </article>
      <FAQ h2="Frequently Asked Questions" items={tech.faq} />
    </>
  );
}
