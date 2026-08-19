import { SmartImage } from "@/components/shared/SmartImage";
import Link from "next/link";
import { QuoteForm } from "@/components/forms/QuoteForm";

const TRUST_ITEMS = [
  { icon: "🛡️", label: "2-Year Warranty" },
  { icon: "✈️", label: "Worldwide Express Shipping" },
  { icon: "⚡", label: "CE / UL Certified Power Supply" },
];

export function QuoteFormSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Left column — trust & factory */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">Yulux Sign</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">Premium Quality.<br />Global Delivery.</h2>
              <p className="mt-4 text-muted leading-relaxed">
                Over 10,000 custom signs delivered to businesses worldwide. Our factory combines precision engineering
                with artistic craftsmanship — every sign is built to last and built to impress.
              </p>
            </div>

            {/* Factory images grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <SmartImage
                  src="/images/quote/factory-2.webp"
                  alt="Yulux Sign factory production line"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <SmartImage
                  src="/images/quote/factory-backview.webp"
                  alt="Yulux Sign factory back view"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative col-span-2 aspect-[16/7] overflow-hidden rounded-xl">
                <SmartImage
                  src="/images/quote/project-1.webp"
                  alt="Yulux Sign completed project showcase"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {TRUST_ITEMS.map((t) => (
                <div key={t.label} className="flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-2 text-sm">
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <blockquote className="rounded-xl border border-card-border bg-card p-5">
              <p className="text-sm leading-relaxed text-muted italic">
                &ldquo;Yulux Sign delivered beyond our expectations. Outstanding quality, professional service, and
                fast delivery. Our go-to partner for global sign solutions.&rdquo;
              </p>
              <footer className="mt-3 flex items-center gap-3">
                <span className="text-accent text-sm">★★★★★</span>
                <div>
                  <p className="text-sm font-semibold">— James Richardson</p>
                  <p className="text-xs text-muted">CEO, BrightMedia Group · United Kingdom</p>
                </div>
              </footer>
            </blockquote>
          </div>

          {/* Right column — form */}
          <div>
            <div className="rounded-2xl border border-card-border bg-card p-6 md:p-8">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold md:text-3xl">Get a Free Quote</h1>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-sm text-accent">
                  <span>⚡</span>
                  <span>Free Technical Drawing &amp; Quote Within 24 Hours</span>
                </div>
              </div>
              <QuoteForm />
              <p className="mt-5 text-center text-sm text-muted">
                Want to see an instant preview?{" "}
                <Link href="/custom-neon-signs" className="text-accent hover:underline font-medium">
                  Click here to use our 3D Customizer →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
