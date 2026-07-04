"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, total } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60" onClick={closeCart} />
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-card-border px-6 py-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={closeCart} className="text-muted hover:text-foreground" aria-label="Close cart">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-center text-muted py-8">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-4 rounded-lg border border-card-border p-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted">Qty: {item.quantity}</p>
                    <p className="text-accent font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-sm text-muted hover:text-red-400">Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-card-border px-6 py-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-accent">${total.toFixed(2)}</span>
            </div>
            <Link href="/get-a-quote" className="btn-primary mt-4 w-full" onClick={closeCart}>
              Proceed to Checkout
            </Link>
            <p className="mt-2 text-center text-xs text-muted">Demo checkout — redirects to quote form</p>
          </div>
        )}
      </aside>
    </>
  );
}
