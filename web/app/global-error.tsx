"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0f] px-4 text-center text-[#f5f5f7]">
        <p className="text-7xl font-bold text-[#a855f7]">500</p>
        <h1 className="mt-4 text-2xl font-bold">Critical Error</h1>
        <p className="mt-3 max-w-md text-[#9ca3af]">
          A critical error occurred. Please try again or visit{" "}
          <a href="/" className="text-[#a855f7] underline">
            yuluxsign.com
          </a>
          .
        </p>
        <button
          onClick={reset}
          className="mt-8 rounded-full bg-[#a855f7] px-6 py-3 text-sm font-semibold text-white"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
