import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-card-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 lg:px-8">
        <div>
          <p className="text-lg font-bold">
            Yulux<span className="text-accent"> Signs</span>
          </p>
          <p className="mt-3 text-sm text-muted">{SITE.description}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Shop Neon</h3>
          <ul className="mt-4 space-y-2">
            {FOOTER_LINKS.products.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">The Signage Lab</h3>
          <ul className="mt-4 space-y-2">
            {FOOTER_LINKS.resources.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
          <ul className="mt-4 space-y-2">
            {FOOTER_LINKS.company.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-card-border px-4 py-6 text-center text-sm text-muted">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <p className="mt-2 flex justify-center gap-4">
          <Link href="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
}
