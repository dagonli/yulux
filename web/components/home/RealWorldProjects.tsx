"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { REAL_WORLD_PROJECTS } from "@/content/home";

type Project = (typeof REAL_WORLD_PROJECTS.projects)[number];

export function RealWorldProjects() {
  const [selected, setSelected] = useState<Project | null>(null);

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
                onClick={() => setSelected(project)}
                className="group relative overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="relative aspect-video w-full md:aspect-auto md:w-1/2 md:shrink-0">
              <Image
                src={selected.image}
                alt={selected.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-between p-6 md:w-1/2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">{selected.craft}</p>
                <h3 className="mt-2 text-xl font-bold">{selected.name}</h3>
                <p className="mt-1 text-sm text-muted">{selected.location}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{selected.description}</p>
              </div>
              <div className="mt-6">
                <Link
                  href="/get-a-quote"
                  className="btn-primary w-full text-center"
                  onClick={() => setSelected(null)}
                >
                  Get a Free Quote for Similar Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
