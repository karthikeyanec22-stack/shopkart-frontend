'use client';

import React, { useState } from 'react';
import { X, ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductDetailModal({ product, onClose, onCheckoutNow }) {
  const { addToCart, setIsDrawerOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const imageUrl =
    product.images?.[0]?.url ||
    product.images?.[0]?.image ||
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsDrawerOpen(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl text-slate-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-300 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Image Column */}
          <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
            <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
            {product.category?.name && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-blue-700 text-xs font-bold border border-slate-200 uppercase shadow-xs">
                {product.category.name}
              </span>
            )}
          </div>

          {/* Product Info Column */}
          <div className="md:col-span-7 space-y-4 flex flex-col justify-between">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
                <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  4.8 <Star className="w-3 h-3 fill-white" />
                </span>
                <span className="text-slate-500">(240 Verified Buyer Reviews)</span>
              </div>

              <h2 className="text-2xl font-black text-slate-900">{product.name}</h2>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-blue-600">
                  ₹{parseFloat(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-xs text-slate-500">Inclusive of all taxes</span>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                {product.description ||
                  'Designed for high performance and durability. Built using premium quality materials for maximum satisfaction.'}
              </p>

              {/* SKU & Stock Info */}
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>SKU: <strong className="text-slate-800">{product.sku || 'N/A'}</strong></span>
                <span>•</span>
                <span>
                  Status:{' '}
                  <strong className={isOutOfStock ? 'text-red-600' : 'text-emerald-600'}>
                    {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock} available)`}
                  </strong>
                </span>
              </div>
            </div>

            {/* Quantity & CTA Actions */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              
              {/* Quantity Picker */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Quantity:</span>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
                  <button
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 disabled:opacity-30"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-bold text-sm text-slate-900">{quantity}</span>
                  <button
                    disabled={quantity >= product.stock}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 disabled:opacity-30"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  disabled={isOutOfStock}
                  onClick={handleBuyNow}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
                >
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Mini Features */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-600 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>1 Yr Warranty</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                  <span>7-Day Return</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
