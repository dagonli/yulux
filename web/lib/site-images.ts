const API_BASE =
  typeof window === "undefined"
    ? (process.env.API_URL ?? "http://localhost:8080")
    : (process.env.NEXT_PUBLIC_API_URL ?? "");

export type SiteImageMap = Record<string, string>;

type ApiResult<T> = { ok: boolean; data?: T; error?: string };

/**
 * /images/** 是前端 public 目录的本地资源：即使后端（旧版本/未重启）返回了
 * 拼过域名的绝对地址，也还原成相对路径，避免 next/image 报未配置远程域名（E231）。
 * 真正的外链 CDN 地址保持原样。
 */
function normalizeSiteImageUrl(value: string): string {
  if (!value.startsWith("http://") && !value.startsWith("https://")) return value;
  try {
    const { pathname } = new URL(value);
    if (pathname.startsWith("/images/")) return pathname;
  } catch {
    // 解析失败则原样返回
  }
  return value;
}

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
    if (!body.ok || !body.data) return {};
    return Object.fromEntries(
      Object.entries(body.data).map(([key, value]) => [key, normalizeSiteImageUrl(value)])
    );
  } catch {
    return {};
  }
}
