"use client";

import { useState } from "react";

type FAQItem = { question: string; answer: string };

export function FAQ({ h2, items }: { h2: string; items: readonly FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">{h2}</h2>
        <div className="mt-10 divide-y divide-card-border rounded-xl border border-card-border bg-card">
          {items.map((item, i) => (
            <div key={i}>
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="pr-4 font-medium">{item.question}</span>
                <span className="text-accent text-xl">{openIndex === i ? "−" : "+"}</span>
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
