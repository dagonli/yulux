import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildMetadata } from "@/lib/metadata";
import { getGalleryPage } from "@/content/gallery";

export const metadata: Metadata = buildMetadata({
  title: "Project Gallery | Yulux Signs",
  description: "Browse real-world custom neon signs, channel letters, and lightbox projects from Yulux Signs worldwide.",
  path: "/gallery",
});

type Props = { searchParams: Promise<{ page?: string }> };

export default async function GalleryPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page ?? "1") || 1;
  const { items, currentPage, totalPages, total } = getGalleryPage(page);

  return (
    <>
      <Breadcrumb items={[{ label: "Gallery" }]} />
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <h1 className="text-4xl font-bold">Project Gallery</h1>
        <p className="mt-4 text-muted">{total} projects showcasing our global craftsmanship.</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-card-border bg-card">
              <div className="relative aspect-square">
                <Image src={item.image} alt={item.alt} fill loading="lazy" className="object-cover" sizes="25vw" />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-sm">{item.title}</h2>
                <p className="mt-1 text-xs text-muted">{item.subtitle}</p>
                <Link href={item.href} className="mt-2 inline-block text-xs text-accent hover:underline">
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="mt-12 flex justify-center gap-2" aria-label="Gallery pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={p === 1 ? "/gallery" : `/gallery?page=${p}`}
                className={`rounded-lg px-4 py-2 text-sm ${
                  p === currentPage ? "bg-accent text-white font-semibold" : "border border-card-border text-muted hover:text-foreground"
                }`}
              >
                {p}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </>
  );
}
