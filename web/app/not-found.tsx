import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Yulux Signs",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page Not Found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/get-a-quote" className="btn-secondary">
          Get a Free Quote
        </Link>
      </div>
    </div>
  );
}
