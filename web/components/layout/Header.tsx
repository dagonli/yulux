"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/content/site";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { count, openCart } = useCart();

  const toggleDropdown = (label: string) => {
    setOpenDropdown((current) => (current === label ? null : label));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Yulux<span className="text-accent"> Signs</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) =>
            "children" in link ? (
              <div key={link.label} className="group relative">
                {"href" in link && link.href ? (
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm text-white transition hover:text-[#8B5CF6]"
                  >
                    {link.label}
                    <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm text-white transition hover:text-[#8B5CF6]"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {link.label}
                    <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
                <div className="invisible absolute left-0 top-full z-50 min-w-[240px] rounded-lg border border-card-border bg-card py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-white hover:bg-white/5 hover:text-[#8B5CF6]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white transition hover:text-[#8B5CF6]"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative rounded-full p-2 text-white hover:text-[#8B5CF6]"
            aria-label="Open cart"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <Link href="/get-a-quote" className="btn-primary hidden text-sm sm:inline-flex">
            Get a Free Quote
          </Link>
          <button
            className="rounded p-2 text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-card-border bg-card px-4 py-4 lg:hidden">
          {NAV_LINKS.map((link) =>
            "children" in link ? (
              <div key={link.label}>
                <button
                  type="button"
                  onClick={() => toggleDropdown(link.label)}
                  className="flex w-full items-center justify-between py-2 text-sm"
                  aria-expanded={openDropdown === link.label}
                >
                  <span>{link.label}</span>
                  <svg
                    className={`h-4 w-4 transition ${openDropdown === link.label ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === link.label &&
                  link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2 pl-4 text-sm text-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <Link href="/get-a-quote" className="btn-primary mt-4 w-full text-sm" onClick={() => setMobileOpen(false)}>
            Get a Free Quote
          </Link>
        </div>
      )}
    </header>
  );
}
