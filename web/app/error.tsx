"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-accent">500</p>
      <h1 className="mt-4 text-2xl font-bold">Something Went Wrong</h1>
      <p className="mt-3 max-w-md text-muted">
        An unexpected error occurred. Our team has been notified. Please try again or return home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button onClick={reset} className="btn-primary">
          Try Again
        </button>
        <Link href="/" className="btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
