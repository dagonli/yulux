const MATERIAL_SPECS = [
  {
    title: "Premium Stainless Steel",
    description:
      "Crafted from corrosion-resistant 304/316 grade stainless steel, ensuring structural integrity and a pristine finish for years.",
  },
  {
    title: "High-Clarity Acrylic",
    description:
      "Utilizing UV-stabilized, high-transparency acrylic for vibrant illumination and resistance against yellowing and cracking.",
  },
  {
    title: "Certified LED Modules",
    description:
      "Equipped with top-tier LED chips boasting 50,000+ hours lifespan, superior brightness. Ensuring your storefront stays zero-maintenance for 5+ years.",
  },
  {
    title: "Globally Certified Power Supplies",
    description:
      "All power components are CE, UL, and RoHS certified, providing stable, safe, and flicker-free operation in any environment.",
  },
] as const;

export function MaterialSpecifications() {
  return (
    <section className="section-padding bg-card/30">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          Engineering-Grade Materials for Uncompromising Quality
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MATERIAL_SPECS.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-card-border bg-card p-6"
            >
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
