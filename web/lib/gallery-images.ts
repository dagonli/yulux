const API_BASE =
  typeof window === "undefined"
    ? (process.env.API_URL ?? "http://localhost:8080")
    : (process.env.NEXT_PUBLIC_API_URL ?? "");

export type GalleryImage = { key: string; url: string; alt: string };

type ApiResult<T> = { ok: boolean; data?: T; error?: string };

/**
 * 服务端拉取画廊图集（后端 site_image 表 gallery_order 非空行按序）。
 * - 后端不可用 / 响应异常 → null：页面回退静态兜底列表（与旧行为一致）
 * - 后端正常但画廊被清空 → []：页面渲染空态（不回退，尊重管理员的移除操作）
 */
export async function getGalleryImages(): Promise<GalleryImage[] | null> {
  try {
    const res = await fetch(`${API_BASE}/api/gallery-images`, {
      // 画廊增删后应尽快生效；开发环境不缓存
      next: process.env.NODE_ENV === "development" ? { revalidate: 0 } : { revalidate: 60 },
    });
    if (!res.ok) return null;
    const body = (await res.json()) as ApiResult<GalleryImage[]>;
    if (!body.ok || !body.data) return null;
    return body.data;
  } catch {
    return null;
  }
}
