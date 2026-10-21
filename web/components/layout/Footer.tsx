import Link from "next/link";
import { CONTACT, FOOTER_LINKS, SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#222] bg-[#0B0B0C]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 lg:px-8">
        <div>
          <p className="text-lg font-bold">
            Yulux<span className="text-accent"> Sign</span>
          </p>
          <p className="mt-3 text-sm text-muted">{SITE.description}</p>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider">Contact Us</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={CONTACT.phoneHref} className="flex items-center gap-2 text-sm text-muted hover:text-foreground">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-sm text-muted hover:text-foreground">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted hover:text-foreground"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-2.415 6.598c-.741.297-2.253.717-3.533.543-1.366-.186-2.616-.748-3.795-1.596C5.552 17.838 3.37 14.73 3.37 14.73s-.842-1.297-1.436-3.074c-.417-1.247-.51-2.297-.51-2.297s-.14-1.01.294-2.29c.444-1.28 1.213-2.075 1.213-2.075s.756-.826 2.192-1.146c1.436-.32 2.51.031 2.51.031l.288-1.088c-1.02-.14-2.23-.098-3.258.382-1.458.679-2.553 1.875-3.174 3.335-.621 1.46-.606 2.935-.357 4.285.249 1.35.912 2.65 1.897 3.947.985 1.297 2.265 2.366 3.795 3.128 1.53.762 3.163 1.044 4.72.882 1.557-.162 2.838-.76 3.574-1.484l-.618-.93c-.736.724-1.98 1.24-3.433 1.433m2.304-16.44C14.49 2.681 11.79 1.85 9.07 2.312L9.36 3.4c2.417-.413 4.85.348 6.63 1.975 1.78 1.627 2.735 3.89 2.735 6.282h1.14c0-2.67-1.095-5.297-3.166-7.146" />
                </svg>
                WhatsApp Chat
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Neon Collection</h3>
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
