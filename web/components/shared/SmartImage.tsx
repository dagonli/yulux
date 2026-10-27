"use client";

import Image, { type ImageProps } from "next/image";
import { resolveSiteImage, useSiteImages } from "@/lib/site-images-context";

/**
 * 包装 next/image：若 src 是可配置图片路径且后台已替换，则用配置的 url，
 * 否则使用原始 src（默认图）。API 与 next/image 一致，外加可选 slot：
 * 模块槽位 id（= 后管分组 id），传入后优先按 `slot::src` 解析该模块独立的
 * 替换图（同图多模块互不影响）；不传则按裸路径解析（画廊页等场景）。
 */
export function SmartImage({ src, slot, ...rest }: ImageProps & { slot?: string }) {
  const map = useSiteImages();
  const resolved = typeof src === "string" ? resolveSiteImage(map, src, slot) : src;
  return <Image src={resolved} {...rest} />;
}
