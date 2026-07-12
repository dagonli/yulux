import type { Metadata } from "next";
import { SITE } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  ogImage?: string;
};

export function buildMetadata({ title, description, keywords, path = "", ogImage }: PageMeta): Metadata {
  const url = `${SITE.url}${path}`;
  const image = ogImage ?? `${SITE.url}/images/og-cover.webp`;
  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: { canonical: url },
  };
}
