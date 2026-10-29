"use client";

import Image from "next/image";
import { useResolvedImage } from "@/lib/site-images-context";
import { SmartImage } from "@/components/shared/SmartImage";

/** 第 2 卡（1:1 安装模板）槽位默认 key：= 后管槽位行 image_key 的路径部分 */
const TEMPLATE_IMAGE = "/images/product-whats-in-box.webp";

export function LogisticsInstallation() {
  return (
    <section className="section-padding bg-card/30">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          Heavy-Duty Protection & Effortless Installation
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-card-border bg-card overflow-hidden">
            <div className="relative aspect-[16/10] overflow-hidden">
              <SmartImage
                src="/images/lightbox/yulux_lightbox_frameless.png"
                alt="100% Shockproof Wooden Crating"
                slot="channel-letters-logistics"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">100% Shockproof Wooden Crating</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                All channel letters are secured in customized, heavy-duty wooden crates. We provide an instant “Broken-on-Arrival” free replacement guarantee.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-card-border bg-card overflow-hidden">
            <TemplateCardImage />
            <div className="p-6">
              <h3 className="text-xl font-bold">Free 1:1 Installation Template</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Every order includes a full-size paper template and complete mounting hardware, saving up to 60% on local architectural installation costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 第 2 卡「Free 1:1 Installation Template」配图：后管已替换的图满铺卡片顶部
 * （fill + cover，对齐后管预览的满铺口径）；未替换时保持原 SVG 线稿占位——
 * 默认 key 是竖版装箱清单图，走 16:10 cover 会裁掉大半，默认态保留原居中展示。
 * useResolvedImage 是 hook，须在子组件顶层调用。
 */
function TemplateCardImage() {
  const resolved = useResolvedImage(TEMPLATE_IMAGE, "channel-letters-logistics");
  // resolved === TEMPLATE_IMAGE 即未被后管替换（上传图 url 恒为 /uploads/...，不会与默认路径相同）
  const uploaded = resolved !== TEMPLATE_IMAGE;
  return (
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-neon-purple/20 to-card">
      {uploaded ? (
        <Image
          src={resolved}
          alt="Free 1:1 Installation Template"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="text-center p-8">
          <svg className="mx-auto h-16 w-16 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="mt-2 text-sm text-muted">1:1 Installation Template</p>
        </div>
      )}
    </div>
  );
}
