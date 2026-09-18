'use client';

import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer({ onProceedToCheckout }) {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    totalItemCount,
    subtotal,
    shipping,
    grandTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!isDrawerOpen) return null;

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-0" onClick={() => setIsDrawerOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Your Shopping Cart</h2>
                <p className="text-xs text-slate-500">{totalItemCount} items selected</p>
              </div>
            </div>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-xl bg-white hover:bg-slate-200 text-slate-500 hover:text-slate-900 border border-slate-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          {items.length > 0 && (
            <div className="px-6 py-3 bg-blue-50/50 border-b border-blue-100 text-xs">
              <div className="flex items-center justify-between text-slate-700 font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                  {subtotal >= freeShippingThreshold ? (
                    <span className="text-emerald-600">You unlocked FREE Express Shipping!</span>
                  ) : (
                    <span>Add ₹{(freeShippingThreshold - subtotal).toFixed(2)} more for FREE Shipping</span>
                  )}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white border border-slate-200 rounded-2xl relative shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-slate-100 border border-slate-200 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm text-slate-900 line-clamp-1 pr-6">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs font-extrabold text-blue-600 mt-0.5">
                        ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-200 rounded text-slate-600 hover:text-slate-900"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-200 rounded text-slate-600 hover:text-slate-900"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-xs font-black text-slate-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-slate-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-slate-300" />
                <p className="text-sm font-bold text-slate-600">Your cart is empty</p>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Explore Products
                </button>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-white space-y-4 shadow-lg">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">
                    ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-slate-900">
                    {shipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Amount</span>
                  <span className="text-blue-600 text-lg">
                    ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onProceedToCheckout();
                  }}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs font-semibold text-slate-400 hover:text-red-600 transition-colors py-1"
                >
                  Empty Cart
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Secure SSL Payment Gateway</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
