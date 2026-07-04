import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FAQ } from "@/components/shared/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { collectionPageSchema, faqSchema, itemListSchema } from "@/lib/schema";
import { LAB_META, LAB_HERO, LAB_CATEGORIES, LAB_FAQ, ARTICLES } from "@/content/signage-lab";
import { SITE } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  ...LAB_META,
  path: "/signage-lab",
});

export default function SignageLabPage() {
  const articleList = ARTICLES.map((a, i) => ({
    name: a.title,
    url: `${SITE.url}/signage-lab/${a.slug}`,
    position: i + 1,
  }));

  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema(LAB_HERO.h1, LAB_META.description, `${SITE.url}/signage-lab`),
          itemListSchema(articleList),
          faqSchema(LAB_FAQ),
        ]}
      />
      <Breadcrumb items={[{ label: "The Signage Lab" }]} />
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <h1 className="text-4xl font-bold md:text-5xl">{LAB_HERO.h1}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{LAB_HERO.subhead}</p>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">Categories</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LAB_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="rounded-xl border border-card-border bg-card p-6 transition hover:border-accent/50"
              >
                <h3 className="font-semibold">{cat.label}</h3>
                <span className="mt-2 inline-block text-sm text-accent">Read guides →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold">Featured Pillar Articles</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/signage-lab/${article.slug}`}
                className="group rounded-xl border border-card-border bg-card p-6 transition hover:border-accent/50"
              >
                <span className="text-xs font-semibold uppercase text-accent">{article.category}</span>
                <h3 className="mt-2 text-lg font-semibold group-hover:text-accent">{article.title}</h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">{article.excerpt}</p>
                <p className="mt-3 text-xs text-muted">{article.readTime}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <FAQ h2="Popular Questions" items={LAB_FAQ} />
    </>
  );
}
