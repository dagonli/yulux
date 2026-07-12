import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SITE } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Yulux Signs",
  description:
    "Learn how Yulux Signs collects, uses, and protects your personal information when you use our website and services.",
  path: "/privacy-policy",
});

const LAST_UPDATED = "July 1, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />
      <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <h1 className="text-3xl font-bold md:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:mt-0 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:space-y-1">

          <section>
            <h2>1. Who We Are</h2>
            <p>
              Yulux Signs (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website at{" "}
              <a href={SITE.url} className="text-accent underline">{SITE.url}</a>. We manufacture and supply
              custom LED neon signs and 3D channel letter signage for clients worldwide. For any
              privacy-related inquiries, contact us at{" "}
              <a href={`mailto:${SITE.email}`} className="text-accent underline">{SITE.email}</a>.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>We may collect the following personal information when you use our website or contact us:</p>
            <ul>
              <li>Name, email address, and company name (from quote and inquiry forms)</li>
              <li>Country or region</li>
              <li>Project details and uploaded design files you voluntarily provide</li>
              <li>IP address, browser type, and pages visited (via analytics tools)</li>
              <li>Cookies and similar tracking technologies (see Section 6)</li>
            </ul>
            <p className="mt-3">
              We do not collect payment information. Any financial transactions are handled by third-party
              payment processors with their own privacy policies.
            </p>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Respond to quote requests and inquiries</li>
              <li>Prepare and deliver custom sign designs and proposals</li>
              <li>Communicate about your order, including production and delivery updates</li>
              <li>Improve our website experience and product offerings</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or share your personal data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2>4. Legal Basis for Processing (GDPR)</h2>
            <p>For users in the European Economic Area (EEA), we process your personal data on the following legal bases:</p>
            <ul>
              <li><strong className="text-foreground">Contract performance</strong> — processing necessary to fulfill your inquiry or order</li>
              <li><strong className="text-foreground">Legitimate interests</strong> — analytics and service improvement</li>
              <li><strong className="text-foreground">Consent</strong> — for cookies that require it (you can withdraw at any time)</li>
            </ul>
          </section>

          <section>
            <h2>5. Data Retention</h2>
            <p>
              We retain personal data for as long as necessary to fulfill the purposes outlined in this policy,
              or as required by law. Inquiry data is typically retained for up to 3 years. You may request
              deletion at any time by contacting{" "}
              <a href={`mailto:${SITE.email}`} className="text-accent underline">{SITE.email}</a>.
            </p>
          </section>

          <section>
            <h2>6. Cookies</h2>
            <p>
              We use essential cookies for site functionality. We may also use analytics cookies (e.g., Google
              Analytics) to understand how visitors use our site. You can control cookie preferences through
              your browser settings. Disabling cookies may affect site functionality.
            </p>
          </section>

          <section>
            <h2>7. Third-Party Services</h2>
            <p>Our website may use the following third-party services, each with their own privacy policies:</p>
            <ul>
              <li>Google Analytics — web traffic analysis</li>
              <li>DHL / FedEx — for shipping and order tracking</li>
            </ul>
          </section>

          <section>
            <h2>8. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access, correct, or delete your personal data</li>
              <li>Object to or restrict certain processing</li>
              <li>Data portability (receive your data in a structured format)</li>
              <li>Withdraw consent at any time (for consent-based processing)</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{" "}
              <a href={`mailto:${SITE.email}`} className="text-accent underline">{SITE.email}</a>.
            </p>
          </section>

          <section>
            <h2>9. International Transfers</h2>
            <p>
              Yulux Signs operates globally. Your information may be processed in countries outside your own.
              We take appropriate safeguards to ensure your data is treated in accordance with this policy
              and applicable data protection laws.
            </p>
          </section>

          <section>
            <h2>10. Children&apos;s Privacy</h2>
            <p>
              Our website is not directed at children under 16. We do not knowingly collect personal data from
              children. If you believe we have inadvertently collected such data, please contact us immediately.
            </p>
          </section>

          <section>
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top of
              this page reflects the most recent revision. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2>12. Contact Us</h2>
            <p>
              For any questions or concerns about this Privacy Policy, please contact:{" "}
              <a href={`mailto:${SITE.email}`} className="text-accent underline">{SITE.email}</a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
