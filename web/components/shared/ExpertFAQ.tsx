"use client";

import { useState } from "react";

const EXPERT_FAQ_ITEMS = [
  {
    question: "What is the typical lead time for a custom project?",
    answer:
      "Our streamlined process ensures production in 3-5 business days. With global express shipping, most clients receive their custom signs within 10-14 days from design approval.",
  },
  {
    question: "Is professional installation required?",
    answer:
      'No. Our signs are designed for "Plug-and-Play" simplicity. Each unit comes with a 1:1 installation template and a complete mounting kit (screws or hanging wires) for effortless setup.',
  },
  {
    question: "Can you provide weatherproofing for outdoor environments?",
    answer:
      'Absolutely. We offer IP67-rated waterproofing for all our neon and channel letter products. Simply specify "Outdoor Use" during customization or in your inquiry.',
  },
  {
    question: "Do you offer bulk discounts for corporate or wholesale orders?",
    answer:
      "Yes. We specialize in B2B partnerships and offer competitive tiered pricing for bulk orders, franchise rollouts, and wholesale distributions.",
  },
] as const;

export function ExpertFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-card/30">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Expert FAQ — Eliminating Final Doubts</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Technical specifications, regulatory compliance, and architectural integration for Yulux professional signage systems.
        </p>

        <div className="mt-10 divide-y divide-card-border rounded-xl border border-card-border bg-card">
          {EXPERT_FAQ_ITEMS.map((item, i) => (
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
      </div>
    </section>
  );
}
