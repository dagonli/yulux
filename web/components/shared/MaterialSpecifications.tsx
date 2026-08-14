import { SmartImage } from "@/components/shared/SmartImage";

const MATERIAL_SPECS = [
  {
    title: "Premium Stainless Steel",
    description:
      "Crafted from corrosion-resistant 304/316 grade stainless steel, ensuring structural integrity and a pristine finish for years.",
    image: "/images/lightbox/yulux_macro_materials.png",
  },
  {
    title: "High-Clarity Acrylic",
    description:
      "Utilizing UV-stabilized, high-transparency acrylic for vibrant illumination and resistance against yellowing and cracking.",
    image: "/images/lightbox/yulux_macro_shapes.png",
  },
  {
    title: "Certified LED Modules",
    description:
      "Equipped with top-tier LED chips boasting 50,000+ hours lifespan, superior brightness. Ensuring your storefront stays zero-maintenance for 5+ years.",
    image: "/images/lightbox/yulux_macro_illumination.png",
  },
  {
    title: "Globally Certified Power Supplies",
    description:
      "All power components are CE, UL, and RoHS certified, providing stable, safe, and flicker-free operation in any environment.",
    image: "/images/lightbox/yulux_lightbox_frameless.png",
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
              className="overflow-hidden rounded-xl border border-card-border bg-card"
            >
              <div className="relative aspect-video bg-gradient-to-br from-neon-purple/20 to-card">
                <SmartImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
