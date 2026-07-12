import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { PRODUCT_SLUGS } from "@/content/products";
import { ARTICLE_SLUGS } from "@/content/signage-lab";
import { TECHNIQUE_SLUGS } from "@/content/channel-letters";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/shop-neon`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/custom-neon-signs`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/custom-neon-logo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/channel-letters-logos`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/custom-lightbox-signs`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/signage-lab`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/get-a-quote`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = PRODUCT_SLUGS.map((slug) => ({
    url: `${base}/products/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLE_SLUGS.map((slug) => ({
    url: `${base}/signage-lab/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const techniqueRoutes: MetadataRoute.Sitemap = TECHNIQUE_SLUGS.map((slug) => ({
    url: `${base}/channel-letters/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes, ...techniqueRoutes];
}
