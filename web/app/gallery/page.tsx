import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { buildMetadata } from "@/lib/metadata";
import { getGalleryPage } from "@/content/gallery";

export const metadata: Metadata = buildMetadata({
  title: "Project Gallery | Yulux Sign",
  description: "Browse real-world custom neon signs, channel letters, and lightbox projects from Yulux Sign worldwide.",
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

        <GalleryGrid items={items} />

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
