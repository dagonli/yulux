"use client";

import { useState } from "react";
import Link from "next/link";

const B2B_FAQ_ITEMS = [
  {
    question: "Can you precisely match our corporate brand guidelines, including custom paint or acrylic colors?",
    answer: (
      <>
        Yes, absolutely. We utilize standard color-matching matrixes to ensure 100% brand consistency. For the metal returns, we offer{" "}
        <strong>high-durability powder coating</strong>{" "}
        matching any specific Pantone or RAL color code. For the illuminated faces, we stock premium UV-stabilized colored acrylics or utilize{" "}
        <strong>high-grade translucent vinyl films</strong>{" "}
        to match your exact corporate identity under both daytime and night-time lighting.
      </>
    ),
  },
  {
    question: "What are the exact structural material grades used for your outdoor non-lit and front-lit channel letters?",
    answer: (
      <>
        For maximum corrosion resistance in harsh outdoor environments, our standard metal components are fabricated from{" "}
        <strong>marine-grade 304 stainless steel channel letters</strong>{" "}
        (or 316 grade upon request). For lightweight architectural requirements, we utilize premium architectural aluminum sheet alloy. All metal joints undergo{" "}
        <strong>precision laser welding</strong>{" "}
        to eliminate gaps, preventing water ingress and ensuring structural integrity against high wind loads.
      </>
    ),
  },
  {
    question: "Do your LED modules and power supplies comply with North American and European electrical codes?",
    answer: (
      <>
        Yes. Safety and regulatory compliance are our top priorities for commercial projects. Every sign is equipped with{" "}
        <strong>UL certified LED signs components</strong>{" "}
        for the US and Canadian markets, or{" "}
        <strong>CE & RoHS compliant systems</strong>{" "}
        for European installations. We exclusively source heavy-duty MeanWell IP67 waterproof drivers, ensuring your signage safely operates on standard 110V – 240V local electrical grids with built-in short-circuit and over-load protection.
      </>
    ),
  },
  {
    question: "How do you ensure perfectly uniform led sign illumination and prevent hot spots on a custom lit sign?",
    answer: (
      <>
        Achieving flawless, edge-to-edge luminosity is at the core of our engineering. To eliminate unsightly hot spots or shadowing on any custom-shaped lit sign, we utilize{" "}
        <strong>high-density, custom-spaced LED arrays</strong>{" "}
        paired with{" "}
        <strong>premium optical-diffusion acrylic</strong>. Furthermore, we offer fully dimmable LED illumination systems. By integrating advanced smart-dimming drivers compatible with 0-10V, DALI, or wireless protocols, you can seamlessly calibrate the brightness of your led sign illumination to perfectly match any ambient light level and maintain brand elegance.
      </>
    ),
  },
] as const;

export function B2BEngineeringFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const scrollToQuote = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 手动滚动而非依赖浏览器锚点跳转：当 URL 已含 #get-a-quote 时，
    // 原生锚点不会再次触发滚动，这里每次点击都强制定位到表单。
    e.preventDefault();
    const el = document.getElementById("get-a-quote");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          B2B Engineering & Technical FAQ
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Technical specifications, regulatory compliance, and architectural integration for Yulux professional signage systems.
        </p>

        <div className="mt-10 divide-y divide-card-border rounded-xl border border-card-border bg-card">
          {B2B_FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="pr-4 font-semibold">{item.question}</span>
                <span className="text-accent text-xl shrink-0">{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-sm leading-relaxed text-muted">{item.answer}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold md:text-3xl">Ready to bring your brand to light?</h3>
          <Link
            href="#get-a-quote"
            onClick={scrollToQuote}
            className="mt-6 inline-block rounded-lg bg-accent px-8 py-3.5 text-base font-bold text-white transition hover:bg-accent-hover"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
