import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
let apiOrigin = "";
let apiRemotePattern: { protocol: "http" | "https"; hostname: string; port?: string; pathname: string } | null = null;
try {
  const u = new URL(apiUrl);
  apiOrigin = u.origin;
  apiRemotePattern = {
    protocol: u.protocol.replace(":", "") as "http" | "https",
    hostname: u.hostname,
    port: u.port || undefined,
    pathname: "/uploads/**",
  };
} catch {
  apiRemotePattern = null;
}

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      `img-src 'self' data: blob: https: http:${apiOrigin ? " " + apiOrigin : ""}`,
      `connect-src 'self' https://www.google-analytics.com${apiOrigin ? " " + apiOrigin : ""}`,
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  // dev 下 fetch 的 HMR 缓存会把后管刚替换的 site-images 映射缓存到热更新间隙，
  // 导致「替换后刷新仍见旧图」；关掉换取后管替换后的严格实时可见（仅影响本地开发）
  experimental: {
    serverComponentsHmrCache: false,
  },
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${apiUrl}/api/:path*` },
      { source: "/admin/:path*", destination: `${apiUrl}/admin/:path*` },
      { source: "/uploads/:path*", destination: `${apiUrl}/uploads/:path*` },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
    // 开发环境后台图片在 localhost:8080，需允许本地 IP/主机名
    dangerouslyAllowLocalIP: true,
    remotePatterns: apiRemotePattern ? [apiRemotePattern] : [],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
