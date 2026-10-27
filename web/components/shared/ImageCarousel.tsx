"use client";

import { useRef, useState } from "react";
import { SmartImage } from "@/components/shared/SmartImage";

type ImageCarouselProps = {
  images: { src: string; alt: string }[];
};

/**
 * Manually navigated horizontal image carousel: swipe or scroll left-right
 * with scroll-snap alignment, prev/next arrows, and a clickable thumbnail
 * rail below the main frame. No auto-play.
 */
export function ImageCarousel({ images }: ImageCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const clamped = Math.max(0, Math.min(images.length - 1, i));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const next = Math.max(
      0,
      Math.min(images.length - 1, Math.round(track.scrollLeft / track.clientWidth))
    );
    setIndex((current) => (current === next ? current : next));
  };

  return (
    <div className="w-full">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <div key={i} className="relative h-full w-full shrink-0 snap-center overflow-hidden">
              <SmartImage src={img.src} alt={img.alt} slot="lightbox-carousel" fill className="object-contain" sizes="60vw" />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70 disabled:pointer-events-none disabled:opacity-0"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === images.length - 1}
          aria-label="Next image"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70 disabled:pointer-events-none disabled:opacity-0"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show image ${i + 1}: ${img.alt}`}
            aria-current={i === index}
            className={`relative aspect-[16/10] flex-1 overflow-hidden rounded-lg border transition ${
              i === index
                ? "border-accent opacity-100"
                : "border-white/10 opacity-50 hover:opacity-90"
            }`}
          >
            <SmartImage src={img.src} alt={img.alt} slot="lightbox-carousel" fill className="object-cover" sizes="15vw" />
          </button>
        ))}
      </div>
    </div>
  );
}
