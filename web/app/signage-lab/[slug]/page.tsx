import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { articleSchema, howToSchema, breadcrumbSchema } from "@/lib/schema";
import { getArticle, ARTICLE_SLUGS } from "@/content/signage-lab";
import { SITE } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/signage-lab/${slug}`,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = `${SITE.url}/signage-lab/${slug}`;
  const schemas: Record<string, unknown>[] = [
    articleSchema({ title: article.title, description: article.excerpt, url }),
    breadcrumbSchema([
      { name: "Home", url: SITE.url },
      { name: "The Signage Lab", url: `${SITE.url}/signage-lab` },
      { name: article.title, url },
    ]),
  ];

  if (article.isHowTo) {
    schemas.push(
      howToSchema(
        article.title,
        article.sections.map((s) => ({ name: s.heading, text: s.content }))
      )
    );
  }

  return (
    <>
      <JsonLd data={schemas} />
      <Breadcrumb
        items={[
          { label: "The Signage Lab", href: "/signage-lab" },
          { label: article.category },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <span className="text-sm font-semibold uppercase text-accent">{article.category}</span>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">{article.title}</h1>
        <p className="mt-2 text-sm text-muted">{article.readTime}</p>

        {article.sections.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="text-2xl font-bold">{section.heading}</h2>
            <p className="mt-4 leading-relaxed text-muted">{section.content}</p>
          </section>
        ))}

        <div className="mt-12 rounded-xl border border-card-border bg-card/50 p-6">
          <p className="text-muted">Ready to start your custom signage project?</p>
          <Link href="/get-a-quote" className="btn-primary mt-4 inline-flex">
            Get a Free Quote
          </Link>
        </div>

        <p className="mt-8">
          <Link href="/signage-lab" className="text-accent hover:underline">
            ← Back to The Signage Lab
          </Link>
        </p>
      </article>
    </>
  );
}
