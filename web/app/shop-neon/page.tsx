import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { getProduct } from "@/content/products";
import { SHOP_NEON_HERO, SHOP_NEON_META, SHOP_NEON_SLUGS } from "@/content/shop-neon";
import { SITE } from "@/content/site";
import { ShopNeonGrid } from "@/components/shop/ShopNeonGrid";

export const metadata: Metadata = buildMetadata({
  ...SHOP_NEON_META,
  path: "/shop-neon",
});

export default function ShopNeonPage() {
  const products = SHOP_NEON_SLUGS.map((slug) => getProduct(slug)).filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];
  const listItems = products.map((product, i) => ({
    name: product.name,
    url: `${SITE.url}/products/${product.slug}`,
    position: i + 1,
  }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: SITE.url },
            { name: "Neon Collection", url: `${SITE.url}/shop-neon` },
          ]),
          itemListSchema(listItems),
        ]}
      />
      <Breadcrumb items={[{ label: "Neon Collection" }]} />
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <h1 id="shop-neon" className="text-4xl font-bold md:text-5xl">{SHOP_NEON_HERO.h1}</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted">{SHOP_NEON_HERO.subhead}</p>
        <ShopNeonGrid products={products} />
      </div>
    </>
  );
}
