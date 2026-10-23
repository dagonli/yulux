"use client";

import { SmartImage } from "@/components/shared/SmartImage";
import { ImageLightbox } from "@/components/shared/ImageLightbox";
import Link from "next/link";
import { useState } from "react";
import { REAL_WORLD_PROJECTS } from "@/content/home";

type Project = (typeof REAL_WORLD_PROJECTS.projects)[number];

export function RealWorldProjects() {
  const [selected, setSelected] = useState<Project | null>(null);

  const openProject = (project: Project) => {
    setSelected(project);
  };

  const closeProject = () => {
    setSelected(null);
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
        <ImageLightbox image={selected.image} alt={selected.alt} onClose={closeProject} />
      )}
    </>
  );
}
