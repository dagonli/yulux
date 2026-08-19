import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { OrderRequestForm } from "@/components/forms/OrderRequestForm";
import { buildMetadata } from "@/lib/metadata";
import { ORDER_REQUEST_META } from "@/content/order-request";

export const metadata: Metadata = buildMetadata({
  ...ORDER_REQUEST_META,
  path: "/order-request",
});

export default function OrderRequestPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Order Request" }]} />
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <h1 className="text-3xl font-bold md:text-4xl">Order Request</h1>
        <p className="mt-3 text-muted">
          Submit your order request below. We&apos;ll confirm your order details, shipping cost, and payment instructions by email within 24 hours.
        </p>
        <div className="mt-8">
          {/* useSearchParams 需 Suspense 包裹，避免静态生成时报错 */}
          <Suspense fallback={<p className="text-sm text-muted">Loading form…</p>}>
            <OrderRequestForm />
          </Suspense>
        </div>
      </div>
    </>
  );
}
