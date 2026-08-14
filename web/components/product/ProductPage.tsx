"use client";

import { SmartImage } from "@/components/shared/SmartImage";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/content/products";
import { PRODUCT_TEMPLATE } from "@/content/site";
import { useCart } from "@/lib/cart-context";

const SIZES = [
  { label: "Small", size: "50cm / 20\"" },
  { label: "Medium", size: "75cm / 30\"" },
  { label: "Large", size: "100cm / 40\"" },
];

const TUBE_TYPES = ["White Tube", "Color Matching Tube"];

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-card-border">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        <span className="text-accent text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="pb-4 text-sm text-muted leading-relaxed">{children}</div>}
    </div>
  );
}

const SHIPPING_COPY = `We ship worldwide via DHL / FedEx express, fully insured. Production takes 7–10 business days, delivery 3–5 days after dispatch. International orders are welcome — the plug type will match your destination country. If you need a specific delivery date, contact our team and we'll do our best to accommodate.`;

export function ProductPage({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<"Warm White" | "Pink">(
    (product.variants?.[0]?.color ?? "Warm White") as "Warm White" | "Pink"
  );
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedTube, setSelectedTube] = useState("White Tube");
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const currentVariant = product.variants?.find((v) => v.color === selectedColor);
  const images = currentVariant?.images ?? [product.image];
  const mainImage = images[activeImageIdx] ?? images[0];

  const handleColorChange = (color: "Warm White" | "Pink") => {
    setSelectedColor(color);
    setActiveImageIdx(0);
  };

  return (
    <>
      {/* === Main product section === */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-xl border border-card-border">
              <SmartImage src={mainImage} alt={product.alt} fill priority className="object-cover" sizes="50vw" />
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                      i === activeImageIdx ? "border-accent" : "border-card-border opacity-60 hover:opacity-100"
                    }`}
                  >
                    <SmartImage src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <p className="text-sm text-accent uppercase tracking-wide">{product.scene}</p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">{product.title}</h1>
            <p className="mt-4 text-lg text-muted">{product.hook}</p>
            <p className="mt-6 text-3xl font-bold text-accent">${product.price}</p>

            {/* Color selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium mb-2">
                  Color: <span className="text-accent">{selectedColor}</span>
                </p>
                <div className="flex gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v.color}
                      onClick={() => handleColorChange(v.color)}
                      title={v.color}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                        selectedColor === v.color
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-card-border text-muted hover:border-accent/50"
                      }`}
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-white/20"
                        style={{ background: v.color === "Pink" ? "#FF69B4" : "#FFF8E7" }}
                      />
                      {v.color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            <div className="mt-5">
              <p className="text-sm font-medium mb-2">
                Size: <span className="text-accent">{SIZES.find((s) => s.label === selectedSize)?.size}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(s.label)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                      selectedSize === s.label
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-card-border text-muted hover:border-accent/50"
                    }`}
                  >
                    {s.label}
                    <span className="ml-1 text-xs opacity-70">({s.size})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tube type */}
            <div className="mt-5">
              <p className="text-sm font-medium mb-2">Tube: <span className="text-accent">{selectedTube}</span></p>
              <div className="flex flex-wrap gap-2">
                {TUBE_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTube(t)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                      selectedTube === t
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-card-border text-muted hover:border-accent/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <button
              className="btn-primary mt-6 w-full sm:w-auto"
              onClick={() =>
                addItem({
                  id: product.slug,
                  name: product.name,
                  price: product.price,
                  href: `/products/${product.slug}`,
                })
              }
            >
              Add to Cart
            </button>
            <p className="mt-2 text-xs text-muted">Delivered in 7-10 business days · Free global shipping · 2-Year Warranty</p>

            {/* Accordion specs below cart */}
            <div className="mt-8 border-t border-card-border">
              <Accordion title={`Why Choose Our ${product.name}?`}>
                <ul className="space-y-3">
                  {product.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-accent shrink-0">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Technical Specifications">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {PRODUCT_TEMPLATE.specs.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="text-accent shrink-0">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Shipping">
                <p>{SHIPPING_COPY}</p>
              </Accordion>
            </div>
          </div>
        </div>

        {/* === What's in the Box === */}
        <section className="mt-20">
          <h2 className="text-center text-2xl font-bold md:text-3xl">What&apos;s in the Box?</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <SmartImage
                src="/images/product-whats-in-box.webp"
                alt="Yulux Signs packaging contents"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <ul className="space-y-4">
                {PRODUCT_TEMPLATE.whatsInBox.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base">
                    <span className="mt-0.5 text-accent text-lg">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted">
                Ordering internationally? No problem. We&apos;ll make sure the plug type matches where your sign is headed.
              </p>
            </div>
          </div>
        </section>

        {/* === Easy 3-Step Installation === */}
        <section className="mt-20 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Easy 3-Step Installation</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { step: 1, title: "Unpack", desc: "Unbox your neon sign and accessories.", img: "/images/product-install-step1.webp" },
              { step: 2, title: "Mount", desc: "Hang with the included chain or mount with screws (pre-drilled holes included).", img: "/images/product-install-step2.webp" },
              { step: 3, title: "Plug & Play", desc: "Connect the dimmer and power adapter, then enjoy the glow!", img: "/images/product-install-step3.webp" },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
                  <SmartImage src={s.img} alt={`Step ${s.step}: ${s.title}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="mt-4">
                  <p className="text-sm font-bold text-accent uppercase tracking-wide">Step {s.step}</p>
                  <p className="mt-1 font-semibold text-lg">{s.title}</p>
                  <p className="mt-1 text-sm text-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === Cross-sell === */}
        <section className="mt-20 rounded-xl border border-card-border bg-card/50 p-8 text-center">
          <p className="text-muted">{PRODUCT_TEMPLATE.crossSell}</p>
          <Link href={PRODUCT_TEMPLATE.crossSellHref} className="btn-primary mt-4 inline-flex">
            {PRODUCT_TEMPLATE.crossSellCta}
          </Link>
          {product.relatedHref && (
            <p className="mt-4 text-sm">
              <Link href={product.relatedHref} className="text-accent hover:underline">
                Check out our {product.relatedLabel} →
              </Link>
            </p>
          )}
        </section>
      </div>

      {/* === FAQ — two-column layout === */}
      <ProductFAQ />
    </>
  );
}

function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = PRODUCT_TEMPLATE.faq;

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-5xl">
        {/* Centered title */}
        <h2 className="text-center text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Get answers to the most common questions about our custom LED neon signs.
        </p>

        {/* Q&A list */}
        <div className="mt-10 divide-y divide-card-border rounded-xl border border-card-border bg-card">
          {items.map((item, i) => (
            <div key={i}>
              <button
                className="flex w-full items-center gap-4 px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                  Q{i + 1}
                </span>
                <span className="flex-1 pr-4 font-semibold text-base">{item.question}</span>
                <span className="text-accent text-xl shrink-0">{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 pl-[4.5rem] text-base leading-relaxed text-muted">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
