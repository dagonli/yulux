"use client";

import Link from "next/link";

type ScrollCtaProps = {
  h2?: string;
  label: string;
};

/**
 * 居中文字 CTA，点击平滑滚动到当前页的 #get-a-quote。
 * 手动滚动以规避浏览器锚点在 URL 已含 hash 时不重复跳转的问题。
 */
export function ScrollCta({ h2, label }: ScrollCtaProps) {
  const scrollToQuote = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("get-a-quote");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-3xl text-center">
        {h2 && <h2 className="text-3xl font-bold md:text-4xl">{h2}</h2>}
        <Link
          href="#get-a-quote"
          onClick={scrollToQuote}
          className="mt-6 inline-block rounded-lg bg-accent px-8 py-3.5 text-base font-bold text-white transition hover:bg-accent-hover"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
