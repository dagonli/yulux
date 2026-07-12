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
 * 按图片路径解析当前 url，取不到则回退默认路径
 */
export function useResolvedImage(pathKey: string): string {
  const map = useContext(SiteImagesContext);
  return map[pathKey] ?? pathKey;
}
