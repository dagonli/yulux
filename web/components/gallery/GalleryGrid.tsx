"use client";

import { useState } from "react";
import { SmartImage } from "@/components/shared/SmartImage";
import { ImageLightbox } from "@/components/shared/ImageLightbox";
import type { GalleryItem } from "@/content/gallery";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setSelected(item)}
          className="group relative overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <SmartImage
              src={item.image}
              alt={item.alt}
              fill
              loading="lazy"
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="25vw"
            />
          </div>
        </button>
      ))}

      {selected && (
        <ImageLightbox image={selected.image} alt={selected.alt} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
