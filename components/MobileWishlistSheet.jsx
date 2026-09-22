'use client';

import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function MobileWishlistSheet({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onToggleWishlist,
  onQuickView,
}) {
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs animate-fadeIn md:hidden">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
        
        {/* Top Handle bar */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-3 shrink-0" />

        {/* Header */}
        <div className="px-5 pb-3 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-pink-500" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">My Wishlist</h3>
              <p className="text-xs text-slate-500">{wishlistedProducts.length} items saved</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistedProducts.length > 0 ? (
            wishlistedProducts.map((product) => {
              const imageUrl =
                product.images?.[0]?.url ||
                product.images?.[0]?.image ||
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';

              return (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 bg-white border border-slate-200 rounded-2xl shadow-xs relative"
                >
                  <img
                    src={imageUrl}
                    alt={product.name}
                    onClick={() => {
                      onClose();
                      onQuickView(product);
                    }}
                    className="w-20 h-20 object-cover rounded-xl bg-slate-100 border border-slate-200 shrink-0 cursor-pointer"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => {
                            onClose();
                            onQuickView(product);
                          }}
                          className="font-bold text-sm text-slate-900 line-clamp-1 cursor-pointer pr-4 hover:text-blue-600"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onToggleWishlist(product.id)}
                          className="text-slate-400 hover:text-pink-500 p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="text-xs font-black text-blue-600 mt-0.5 block">
                        ₹{parseFloat(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          addToCart(product);
                          onToggleWishlist(product.id);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          onQuickView(product);
                        }}
                        className="text-xs text-blue-600 font-bold hover:underline"
                      >
                        View Detail
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 space-y-3">
              <Heart className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-sm font-bold text-slate-600">Your wishlist is empty</p>
              <p className="text-xs text-slate-400">Save items you like to view them anytime.</p>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
