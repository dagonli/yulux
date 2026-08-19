"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ORDER_REQUEST_FORM_FIELDS } from "@/content/order-request";
import { getProduct } from "@/content/products";

/**
 * Order Request 询价表单。
 *
 * 从 URL query 读取产品页带过来的预填选项（product/color/size/tube/powerSupply），
 * 顶部展示商品摘要，提交成功后弹出确认 Modal（而非 InquiryForm 默认的内联成功卡）。
 */
export function OrderRequestForm() {
  const params = useSearchParams();

  const productSlug = params.get("product") ?? "";
  const product = productSlug ? getProduct(productSlug) : undefined;

  // 用 URL query 预填各下拉；不在 options 内的值会被 <select> 忽略，回退到 "Select..."
  const prefill = {
    color: params.get("color") ?? "",
    size: params.get("size") ?? "",
    tube: params.get("tube") ?? "",
    powerSupply: params.get("powerSupply") ?? "",
  };

  const [showModal, setShowModal] = useState(false);

  // 给字段注入 defaultValue（来自 URL query）
  const fields = ORDER_REQUEST_FORM_FIELDS.map((f) => {
    if (f.id in prefill) {
      return { ...f, defaultValue: prefill[f.id as keyof typeof prefill] || f.defaultValue };
    }
    return f;
  });

  // 注入隐藏 productSlug 字段（落入 payload，不在表单可见区显示）
  const fieldsWithProduct = productSlug
    ? [...fields, { id: "productSlug", label: "", type: "hidden", defaultValue: productSlug, fullWidth: false } as (typeof fields)[number]]
    : fields;

  return (
    <>
      <InquiryForm
        inquiryType="ORDER_REQUEST"
        fields={fieldsWithProduct}
        submitLabel="Submit Order"
        twoColumn
        centerSubmit
        productSummary={
          product
            ? { name: product.name, image: product.image }
            : undefined
        }
        onSuccess={() => setShowModal(true)}
      />

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-confirm-title"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-card-border bg-card p-8 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 id="order-confirm-title" className="text-xl font-bold">We&apos;ve received your order request.</h2>
            <p className="mt-3 text-sm text-muted">
              We&apos;ll confirm your order details, shipping cost and payment instructions by email within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="btn-primary mt-6 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
