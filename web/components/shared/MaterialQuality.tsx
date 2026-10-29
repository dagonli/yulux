"use client";

import Image from "next/image";
import { MATERIAL_QUALITY } from "@/content/site";
import { useResolvedImage } from "@/lib/site-images-context";

const ICON_MAP: Record<string, string> = {
  "High-Efficiency LED Neon Flex": "/images/icons/yulux_icon_neon_flex.png",
  "Commercial-Grade Acrylic": "/images/icons/yulux_icon_acrylic.png",
  "Certified Power & Safety Systems": "/images/icons/yulux_icon_safety.png",
};

/** slot = 模块槽位 id（= 后管分组 id），两处调用各自独立：neon-signs-material / neon-logo-material */
export function MaterialQuality({ slot }: { slot?: string }) {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Material & Quality</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Quality materials selected for every custom-built project.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {MATERIAL_QUALITY.map((item) => (
            <div key={item.title} className="rounded-xl border border-card-border bg-card overflow-hidden">
              <MaterialCardImage
                src={ICON_MAP[item.title] || "/images/icons/yulux_icon_quality.png"}
                alt={item.alt}
                slot={slot}
              />
              <div className="p-6">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 材质卡头图：后管已替换的实拍图满铺卡片顶部（fill + cover，对齐后管预览的满铺口径）；
 * 未替换时回退默认透明图标（居中 contain，渐变底从透明处透出）——
 * 1920×1920 方形默认图标若走 16:9 cover 会被裁掉近半，默认态保留原居中展示。
 * useResolvedImage 是 hook，须在子组件顶层调用，不能写在 map 回调里。
 */
function MaterialCardImage({ src, alt, slot }: { src: string; alt: string; slot?: string }) {
  const resolved = useResolvedImage(src, slot);
  // resolved === src 即未被后管替换（上传图 url 恒为 /uploads/...，不会与默认路径相同）
  const uploaded = resolved !== src;
  return (
    <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-neon-purple/20 to-card">
      {uploaded ? (
        <Image
          src={resolved}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ) : (
        <Image src={src} alt={alt} width={80} height={80} className="object-contain" />
      )}
    </div>
  );
}
