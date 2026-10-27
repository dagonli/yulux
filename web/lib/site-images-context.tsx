"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteImageMap } from "@/lib/site-images";

const SiteImagesContext = createContext<SiteImageMap>({});

export function SiteImagesProvider({
  value,
  children,
}: {
  value: SiteImageMap;
  children: ReactNode;
}) {
  return <SiteImagesContext.Provider value={value}>{children}</SiteImagesContext.Provider>;
}

export function useSiteImages() {
  return useContext(SiteImagesContext);
}

/**
 * 槽位解析链：map[slot::src] ?? map[src] ?? src。
 * `slot::src` 格式与后端 SiteImageCatalog.slotKey / DB 槽位行 image_key 一致，
 * 同图多模块各自独立替换；不传 slot（画廊页等）按裸路径解析。
 */
export function resolveSiteImage(map: SiteImageMap, src: string, slot?: string): string {
  if (slot) {
    const hit = map[`${slot}::${src}`];
    if (hit) return hit;
  }
  return map[src] ?? src;
}

/**
 * 按图片路径（+ 可选模块槽位）解析当前 url，取不到则回退默认路径
 */
export function useResolvedImage(pathKey: string, slot?: string): string {
  return resolveSiteImage(useContext(SiteImagesContext), pathKey, slot);
}
