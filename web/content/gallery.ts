import { REAL_WORLD_PROJECTS, INSPIRATION_GALLERY } from "./home";

export const GALLERY_ITEMS = [
  ...REAL_WORLD_PROJECTS.projects.map((p) => ({
    id: p.slug,
    image: p.image,
    alt: p.alt,
  })),
  ...INSPIRATION_GALLERY.items.map((item) => ({
    id: item.id,
    image: item.image,
    alt: item.alt,
  })),
];

export type GalleryItem = (typeof GALLERY_ITEMS)[number];

export const ITEMS_PER_PAGE = 8;

export function getGalleryPage(page: number) {
  const total = GALLERY_ITEMS.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  return {
    items: GALLERY_ITEMS.slice(start, start + ITEMS_PER_PAGE),
    currentPage,
    totalPages,
    total,
  };
}
