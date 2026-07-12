"use client";

import Image, { type ImageProps } from "next/image";
import { useSiteImages } from "@/lib/site-images-context";

/**
 * 包装 next/image：若 src 是可配置图片路径且后台已替换，则用配置的 url，
 * 否则使用原始 src（默认图）。API 与 next/image 一致。
 */
export function SmartImage({ src, ...rest }: ImageProps) {
  const map = useSiteImages();
  const resolved = typeof src === "string" && map[src] ? map[src] : src;
  return <Image src={resolved} {...rest} />;
}
