"use client";

import { SmartImage } from "@/components/shared/SmartImage";
import Link from "next/link";
import { useRef, useState } from "react";

const ZOOM_SCALE = 1.8;

type ImageLightboxProps = {
  image: string;
  alt: string;
  /** 模块槽位 id（= 后管分组 id）；画廊页不传（裸 key 解析），首页项目放大图传 home-projects */
  slot?: string;
  onClose: () => void;
};

export function ImageLightbox({ image, alt, slot, onClose }: ImageLightboxProps) {
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const [isZoomed, setIsZoomed] = useState(false);
  const zoomContainerRef = useRef<HTMLDivElement | null>(null);

  const updateZoomOrigin = (clientX: number, clientY: number) => {
    const container = zoomContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setZoomOrigin(`${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
          aria-label="Close"
        >
          ✕
        </button>

        <div
          ref={zoomContainerRef}
          className="relative h-[55vh] min-h-[260px] w-full cursor-zoom-in overflow-hidden bg-black md:h-[62vh]"
          onMouseMove={(e) => {
            updateZoomOrigin(e.clientX, e.clientY);
            setIsZoomed(true);
          }}
          onMouseLeave={() => setIsZoomed(false)}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            if (!touch) return;
            updateZoomOrigin(touch.clientX, touch.clientY);
            setIsZoomed(true);
          }}
          onTouchEnd={() => setIsZoomed(false)}
        >
          <div
            className="relative h-full w-full transition-transform duration-300 ease-out"
            style={{
              transform: isZoomed ? `scale(${ZOOM_SCALE})` : "scale(1)",
              transformOrigin: zoomOrigin,
            }}
          >
            <SmartImage
              src={image}
              alt={alt}
              slot={slot}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        </div>

        <div className="flex justify-center border-t border-card-border p-5">
          <Link
            href="/get-a-quote"
            className="btn-primary shrink-0 text-center"
            onClick={onClose}
          >
            Get a Free Quote for Similar Project
          </Link>
        </div>
      </div>
    </div>
  );
}
