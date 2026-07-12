import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SITE } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | Yulux Signs",
  description:
    "Read the Terms of Service for Yulux Signs. Understand your rights and responsibilities when using our website and ordering custom signage.",
  path: "/terms",
});

const LAST_UPDATED = "July 1, 2026";

export default function TermsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Terms of Service" }]} />
      <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <h1 className="text-3xl font-bold md:text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:mt-0 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:space-y-1">

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Yulux Signs website at{" "}
              <a href={SITE.url} className="text-accent underline">{SITE.url}</a>, you agree to be bound by
              these Terms of Service. If you do not agree, please do not use our website.
            </p>
          </section>

          <section>
            <h2>2. Our Services</h2>
            <p>
              Yulux Signs provides custom LED neon signs and 3D channel letter signage. Products are made to
              order based on customer specifications. The website serves as a showcase and inquiry platform;
              final orders are confirmed via direct communication with our team.
            </p>
          </section>

          <section>
            <h2>3. Pricing and Orders</h2>
            <ul>
              <li>All prices displayed on the website are estimates and subject to change based on final specifications.</li>
              <li>A firm quote will be provided within 24 hours of inquiry submission.</li>
              <li>Orders are considered confirmed only upon receipt of written confirmation and deposit payment.</li>
              <li>Prices are quoted in USD unless otherwise stated.</li>
            </ul>
          </section>

          <section>
            <h2>4. Custom Orders and Design Approval</h2>
            <ul>
              <li>All custom signs are produced based on approved design mockups.</li>
              <li>Customers must review and approve the final technical drawing before production begins.</li>
              <li>Once production has started, design changes may incur additional costs.</li>
              <li>Unlimited revisions apply to the design mockup stage only, prior to production approval.</li>
            </ul>
          </section>

          <section>
            <h2>5. Production and Shipping</h2>
            <ul>
              <li>Standard production time is 7–10 business days after design approval and payment confirmation.</li>
              <li>Shipping is via DHL or FedEx express, fully insured.</li>
              <li>Delivery times are estimates; Yulux Signs is not responsible for carrier delays.</li>
              <li>Customers are responsible for import duties and taxes in their country.</li>
            </ul>
          </section>

          <section>
            <h2>6. Warranty</h2>
            <p>
              Yulux Signs provides a 2-year limited warranty covering manufacturing defects and LED failures
              under normal operating conditions. This warranty does not cover:
            </p>
            <ul>
              <li>Physical damage from mishandling, accidents, or improper installation</li>
              <li>Damage caused by using the sign in conditions outside its rated environment (e.g., using an indoor sign outdoors)</li>
              <li>Normal wear and fading over time</li>
            </ul>
          </section>

          <section>
            <h2>7. Returns and Refunds</h2>
            <p>
              As all products are custom-made to order, we do not accept returns for change of mind. If a
              product arrives damaged or defective, please contact us within 7 days of delivery with photo
              documentation. We will arrange for repair, replacement, or a refund at our discretion.
            </p>
          </section>

          <section>
            <h2>8. Intellectual Property</h2>
            <p>
              All content on this website, including images, text, and design elements, is owned by Yulux
              Signs or licensed to us. You may not reproduce, distribute, or create derivative works without
              our express written permission.
            </p>
            <p className="mt-3">
              By submitting design files or logos for a custom order, you confirm you have the rights to use
              those materials and grant Yulux Signs a license to use them solely for producing your order.
            </p>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Yulux Signs shall not be liable for any indirect,
              incidental, special, or consequential damages arising from the use of our products or website.
              Our total liability shall not exceed the amount paid for the specific order in question.
            </p>
          </section>

          <section>
            <h2>10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the applicable jurisdiction, without regard to conflict
              of law principles. Any disputes shall be resolved through good-faith negotiation first, and
              thereafter through binding arbitration if necessary.
            </p>
          </section>

          <section>
            <h2>11. Changes to Terms</h2>
            <p>
              We may update these Terms of Service at any time. Continued use of the website after changes
              constitutes acceptance of the new terms. We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2>12. Contact</h2>
            <p>
              For any questions about these Terms, contact us at{" "}
              <a href={`mailto:${SITE.email}`} className="text-accent underline">{SITE.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
