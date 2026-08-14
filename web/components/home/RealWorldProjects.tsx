"use client";

import { SmartImage } from "@/components/shared/SmartImage";
import Link from "next/link";
import { useRef, useState } from "react";
import { REAL_WORLD_PROJECTS } from "@/content/home";

type Project = (typeof REAL_WORLD_PROJECTS.projects)[number];

const ZOOM_SCALE = 1.8;

export function RealWorldProjects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const [isZoomed, setIsZoomed] = useState(false);
  const zoomContainerRef = useRef<HTMLDivElement | null>(null);

  const openProject = (project: Project) => {
    setSelected(project);
    setIsZoomed(false);
    setZoomOrigin("50% 50%");
  };

  const closeProject = () => {
    setSelected(null);
    setIsZoomed(false);
  };

  const updateZoomOrigin = (clientX: number, clientY: number) => {
    const container = zoomContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setZoomOrigin(`${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`);
  };

  return (
    <>
      <section className="section-padding bg-card/30" aria-label="Real-World Projects">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">{REAL_WORLD_PROJECTS.h2}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">{REAL_WORLD_PROJECTS.subhead}</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REAL_WORLD_PROJECTS.projects.map((project) => (
              <button
                key={project.slug}
                onClick={() => openProject(project)}
                className="group relative overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <SmartImage
                    src={project.image}
                    alt={project.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-semibold text-white">{project.name}</p>
                    <p className="text-sm text-accent">{project.craft}</p>
                    <p className="text-xs text-white/70">{project.location}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                    <span className="rounded-full bg-white/10 backdrop-blur-sm border border-white/30 px-4 py-2 text-sm font-semibold text-white">
                      + View Details
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href={REAL_WORLD_PROJECTS.viewAll.href} className="btn-secondary">
              {REAL_WORLD_PROJECTS.viewAll.label}
            </Link>
          </div>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={closeProject}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeProject}
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
                  src={selected.image}
                  alt={selected.alt}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>

              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 transition-opacity duration-300 ${
                  isZoomed ? "opacity-0" : "opacity-100"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">{selected.craft}</p>
                <h3 className="mt-1 text-xl font-bold text-white md:text-2xl">{selected.name}</h3>
                <p className="mt-1 text-sm text-white/70">{selected.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-card-border p-5 md:flex-row md:items-center md:justify-between">
              <p className="max-w-2xl text-sm leading-relaxed text-muted">{selected.description}</p>
              <Link
                href="/get-a-quote"
                className="btn-primary shrink-0 text-center"
                onClick={closeProject}
              >
                Get a Free Quote for Similar Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
