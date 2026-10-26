import { REAL_WORLD_PROJECTS, INSPIRATION_GALLERY } from "./home";

export type GalleryItem = { id: string; image: string; alt: string };

/** 按 image 路径去重保首现：image2/image5 原各被 2 张卡使用，去重后 12 项 */
function dedupeByImage<T extends { image: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.image)) return false;
    seen.add(item.image);
    return true;
  });
}

/**
 * 静态兜底列表（仅后端 /api/gallery-images 不可用时使用）：
 * 顺序与后端 V5__gallery_images.sql 的 gallery_order 1..12 逐项一致
 * （6 张 projects + INSPIRATION_GALLERY 去重保首现：image3, image5, image1, image4, image2, image6）
 */
export const FALLBACK_GALLERY_ITEMS: GalleryItem[] = [
  ...REAL_WORLD_PROJECTS.projects.map((p) => ({ id: p.slug, image: p.image, alt: p.alt })),
  ...dedupeByImage(INSPIRATION_GALLERY.items).map((item) => ({
    id: item.id,
    image: item.image,
    alt: item.alt,
  })),
];

export const ITEMS_PER_PAGE = 6;

/** 分页（clamp + slice）；items 由调用方传入（DB 动态列表或静态兜底） */
export function getGalleryPage(items: GalleryItem[], page: number) {
  const total = items.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  return {
    items: items.slice(start, start + ITEMS_PER_PAGE),
    currentPage,
    totalPages,
    total,
  };
}
