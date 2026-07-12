const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export type SiteImageMap = Record<string, string>;

type ApiResult<T> = { ok: boolean; data?: T; error?: string };

/**
 * 服务端拉取站点图片映射（key=图片路径 -> 当前 url）。
 * 后端不可用时返回空对象，前端回退到默认图，不影响页面渲染。
 */
export async function getSiteImages(): Promise<SiteImageMap> {
  try {
    const res = await fetch(`${API_BASE}/api/site-images`, {
      // 后台替换图片后应尽快生效；开发环境不缓存
      next: process.env.NODE_ENV === "development" ? { revalidate: 0 } : { revalidate: 60 },
    });
    if (!res.ok) return {};
    const body = (await res.json()) as ApiResult<SiteImageMap>;
    return body.ok && body.data ? body.data : {};
  } catch {
    return {};
  }
}
