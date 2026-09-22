'use client';

import React, { useState } from 'react';
import { X, ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Plus, Minus, Tag, Zap, ArrowRight } from 'lucide-react';
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
  const price = parseFloat(product.price);
  const mrp = Math.round(price * 1.25);
  const discountPercent = 20;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsDrawerOpen(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      
      {/* Backdrop overlay click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Flipkart Detail Sheet Card */}
      <div className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] bg-white sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl text-slate-900 flex flex-col z-10 animate-slideUp">
        
        {/* Mobile Top Drag Handle & Close Button */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              Flipkart Verified
            </span>
            <span className="text-xs text-slate-500 font-bold">Product Overview</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Image Column */}
            <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
              <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
              {product.category?.name && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-blue-700 text-xs font-black border border-slate-200 uppercase shadow-xs">
                  {product.category.name}
                </span>
              )}
            </div>

            {/* Product Info Column */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Rating & Assured Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-600 text-white text-xs font-black px-2 py-0.5 rounded flex items-center gap-1">
                    4.8 <Star className="w-3 h-3 fill-white" />
                  </span>
                  <span className="text-slate-500 text-xs font-semibold">(240 Flipkart Reviews)</span>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black italic">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Assured ★</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-blue-600">
                  ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
                </span>
                <span className="text-sm text-slate-400 line-through font-semibold">
                  ₹{mrp.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
                </span>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {discountPercent}% Off
                </span>
              </div>

              <p className="text-xs text-slate-400 font-semibold -mt-2">Inclusive of all taxes</p>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed pt-1">
                {product.description ||
                  'Engineered for maximum satisfaction and high durability. Verified Flipkart seller product.'}
              </p>

              {/* Bank Offers List (Flipkart Style) */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 space-y-2">
                <h4 className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-amber-600" />
                  <span>Available Bank & Festival Offers</span>
                </h4>
                <ul className="text-[11px] text-slate-700 space-y-1 font-medium">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>Bank Offer: 10% Instant Discount on HDFC & ICICI Credit Cards.</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>Special Price: Get extra ₹500 off on Prepaid orders.</span>
                  </li>
                </ul>
              </div>

              {/* Flipkart Assurance Pills */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-700 text-center font-bold">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Free Delivery</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1">
                  <RotateCcw className="w-4 h-4 text-amber-500" />
                  <span>7-Day Return</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>COD Available</span>
                </div>
              </div>

              {/* Quantity Picker */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-black uppercase text-slate-600">Quantity:</span>
                <div className="flex items-center bg-slate-100 border border-slate-300 rounded-xl p-1">
                  <button
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 rounded-lg hover:bg-slate-200 text-slate-700 disabled:opacity-30"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-black text-sm text-slate-900">{quantity}</span>
                  <button
                    disabled={quantity >= product.stock}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 rounded-lg hover:bg-slate-200 text-slate-700 disabled:opacity-30"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Dual Sticky Action Buttons at Bottom (Flipkart Mobile App Style) */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0 grid grid-cols-2 gap-3 shadow-lg z-20">
          <button
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-md transition-all active:scale-98"
          >
            <ShoppingCart className="w-4.5 h-4.5 text-slate-950" />
            <span>ADD TO CART</span>
          </button>

          <button
            disabled={isOutOfStock}
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-sm shadow-md transition-all active:scale-98"
          >
            <span>BUY NOW</span>
            <ArrowRight className="w-4.5 h-4.5 text-white" />
          </button>
        </div>

      </div>

    </div>
  );
}
