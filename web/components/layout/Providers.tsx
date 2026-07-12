"use client";

import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/shared/CartDrawer";
import { SiteImagesProvider } from "@/lib/site-images-context";
import type { SiteImageMap } from "@/lib/site-images";

export function Providers({
  children,
  siteImages = {},
}: {
  children: React.ReactNode;
  siteImages?: SiteImageMap;
}) {
  return (
    <SiteImagesProvider value={siteImages}>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </SiteImagesProvider>
  );
}
