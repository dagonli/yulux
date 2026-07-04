import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { ABOUT_META, ABOUT_SECTIONS } from "@/content/about";
import { SITE } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  ...ABOUT_META,
  path: "/about",
});

function renderBody(section: (typeof ABOUT_SECTIONS)[number]) {
  return section.body.split("\n").map((para, i) => {
    if ("links" in section && section.links) {
      let content: React.ReactNode = para;
      section.links.forEach((link) => {
        if (para.includes(link.label)) {
          content = (
            <>
              {para.split(link.label)[0]}
              <Link href={link.href} className="text-accent hover:underline">
                {link.label}
              </Link>
              {para.split(link.label)[1]}
            </>
          );
        }
      });
      return <p key={i}>{content}</p>;
    }
    return <p key={i}>{para}</p>;
  });
}

export default function AboutPage() {
  const [hero, ...sections] = ABOUT_SECTIONS;

  const crumbs = breadcrumbSchema([
    { name: "Home", url: SITE.url },
    { name: "About us", url: `${SITE.url}/about` },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />
      <Breadcrumb items={[{ label: "About us" }]} />
      <article className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <h1 className="text-4xl font-bold md:text-5xl">{hero.headline}</h1>
        <div className="mt-6 space-y-4 text-muted leading-relaxed">{renderBody(hero)}</div>

        {sections.map((section) => (
          <section key={section.id} className="mt-16">
            <h2 className="text-2xl font-bold">{section.headline}</h2>
            <div className="mt-4 space-y-4 text-muted leading-relaxed whitespace-pre-line">
              {renderBody(section)}
            </div>
            {"image" in section && section.image && (
              <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
                <Image
                  src={section.image}
                  alt={"imageAlt" in section ? section.imageAlt : ""}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="800px"
                />
              </div>
            )}
            {"ctas" in section && section.ctas && (
              <div className="mt-6 flex flex-wrap gap-4">
                {section.ctas.map((cta) => (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className={cta.href.includes("quote") ? "btn-primary" : "btn-secondary"}
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            )}
          </section>
        ))}
      </article>
    </>
  );
}
