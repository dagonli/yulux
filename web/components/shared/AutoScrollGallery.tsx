"use client";

import { SmartImage } from "@/components/shared/SmartImage";

type AutoScrollGalleryProps = {
  images: { src: string; alt: string }[];
  /** Scroll duration in seconds for one full loop. */
  duration?: number;
};

/**
 * Vertically auto-scrolling image gallery (marquee). Pure CSS animation
 * (see `.lightbox-marquee` in globals.css), no external dependency.
 * Duplicates the image list to create a seamless loop.
 */
export function AutoScrollGallery({ images, duration = 24 }: AutoScrollGalleryProps) {
  const loop = [...images, ...images];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10">
      <div
        className="lightbox-marquee flex w-full flex-col gap-3 p-3"
        style={{ ["--lightbox-marquee-duration" as string]: `${duration}s` }}
      >
        {loop.map((img, i) => (
          <div key={i} className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg">
            <SmartImage
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="60vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
