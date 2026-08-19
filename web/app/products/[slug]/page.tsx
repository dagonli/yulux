import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProductPage } from "@/components/product/ProductPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { productSchema, breadcrumbSchema } from "@/lib/schema";
import { getProduct, PRODUCT_SLUGS } from "@/content/products";
import { SITE } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.keywords,
    path: `/products/${slug}`,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const url = `${SITE.url}/products/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: product.name,
            description: product.hook,
            image: product.image,
            url,
          }),
          breadcrumbSchema([
            { name: "Home", url: SITE.url },
            { name: "Neon Collection", url: `${SITE.url}/shop-neon` },
            { name: product.name, url },
          ]),
        ]}
      />
      <Breadcrumb items={[{ label: "Neon Collection", href: "/shop-neon" }, { label: product.name }]} />
      <ProductPage product={product} />
    </>
  );
}
