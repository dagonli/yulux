"use client";

import Image from "next/image";
import { useResolvedImage } from "@/lib/site-images-context";

const ADVANTAGES = [
  {
    icon: "/images/icons/yulux_icon_quality.png",
    title: "Built to Your Specifications",
    description:
      "Custom-built using quality materials and professional 12V LED technology, with careful attention to dimensions, finish, illumination, and installation requirements.",
  },
  {
    icon: "/images/icons/yulux_icon_shipping.png",
    title: "Global Express & Insured Shipping",
    description:
      'Fully insured worldwide delivery via DHL/FedEx/UPS. We provide a "Broken-on-arrival" instant replacement guarantee.',
  },
  {
    icon: "/images/icons/yulux_icon_response.png",
    title: "24-Hour Rapid Technical Response",
    description:
      "For most complete custom inquiries, we'll review your requirements and respond with a professional mockup and quotation within 24 hours.",
  },
  {
    icon: "/images/icons/yulux_icon_warranty.png",
    title: "2-Year Limited Warranty",
    description:
      "2-Year Limited Warranty covering manufacturing defects and LED failures under normal operating conditions. Terms and exclusions apply.",
  },
] as const;

/** slot = 模块槽位 id（= 后管分组 id），三处调用各自独立：home-advantage / neon-signs-advantage / neon-logo-advantage */
export function YuluxAdvantage({ slot }: { slot?: string }) {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Why Industry Leaders Choose Yulux Sign</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <AdvantageIcon src={item.icon} alt={item.title} slot={slot} />
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 优势圆形图标：后管已替换的图满铺 64px 圆（fill + cover，overflow-hidden 裁成圆形）；
 * 未替换时保持原 40×40 居中 contain 小图标（透明底透出 bg-accent/10）。
 * useResolvedImage 是 hook，须在子组件顶层调用，不能写在 map 回调里。
 */
function AdvantageIcon({ src, alt, slot }: { src: string; alt: string; slot?: string }) {
  const resolved = useResolvedImage(src, slot);
  // resolved === src 即未被后管替换（上传图 url 恒为 /uploads/...，不会与默认路径相同）
  const uploaded = resolved !== src;
  return (
    <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-accent/10">
      {uploaded ? (
        <Image src={resolved} alt={alt} fill sizes="64px" className="object-cover" />
      ) : (
        <Image src={src} alt={alt} width={40} height={40} className="object-contain" />
      )}
    </div>
  );
}
