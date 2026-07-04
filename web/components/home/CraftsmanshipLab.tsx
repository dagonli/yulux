import Image from "next/image";
import Link from "next/link";
import { CRAFTSMANSHIP_LAB } from "@/content/home";

export function CraftsmanshipLab() {
  return (
    <section id="craftsmanship-lab" className="section-padding bg-card/30">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">{CRAFTSMANSHIP_LAB.h2}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">{CRAFTSMANSHIP_LAB.subhead}</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {CRAFTSMANSHIP_LAB.techniques.map((tech) => (
            <div key={tech.id} className="group rounded-xl border border-card-border bg-card overflow-hidden">
              <div className="relative aspect-square">
                <Image src={tech.image} alt={tech.alt} fill loading="lazy" className="object-cover" sizes="20vw" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{tech.label}</h3>
                <p className="text-sm text-accent">{tech.subLabel}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted opacity-0 transition group-hover:opacity-100">
                  {tech.definition}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href={CRAFTSMANSHIP_LAB.cta.href} className="btn-secondary">
            {CRAFTSMANSHIP_LAB.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
