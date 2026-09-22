'use client';

import React from 'react';
import { Star, ShoppingCart, Eye, Heart, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product, onQuickView, isWishlisted, onToggleWishlist }) {
  const { addToCart } = useCart();
  const imageUrl =
    product.images?.[0]?.url ||
    product.images?.[0]?.image ||
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';

  const isOutOfStock = product.stock <= 0;

  // Calculate dummy MRP & Discount for Flipkart style display
  const price = parseFloat(product.price);
  const mrp = Math.round(price * 1.25);
  const discountPercent = 20;

  return (
    <div className="group relative bg-white border border-slate-200 hover:border-blue-500 rounded-2xl overflow-hidden transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between">
      
      {/* Top Image Box */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        
        {/* Flipkart Category & Stock Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.category?.name && (
            <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-slate-800 text-[9px] font-black uppercase tracking-wider border border-slate-200 shadow-xs">
              {product.category.name}
            </span>
          )}
          {isOutOfStock ? (
            <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-600 text-[9px] font-bold border border-red-200">
              Out of Stock
            </span>
          ) : product.stock < 10 ? (
            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[9px] font-bold border border-amber-200">
              Only {product.stock} left
            </span>
          ) : null}
        </div>

        {/* Wishlist Heart Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-400 hover:text-pink-500 shadow-xs transition-all hover:scale-110"
          title="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-500 text-pink-500' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={imageUrl}
          alt={product.name}
          onClick={() => onQuickView(product)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
        />

        {/* Desktop Quick View Overlay */}
        <div className="hidden sm:flex absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center">
          <button
            onClick={() => onQuickView(product)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-slate-900 font-bold text-xs border border-slate-200 hover:bg-slate-50 transition-all shadow-md"
          >
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>Quick View</span>
          </button>
        </div>

      </div>

      {/* Flipkart Card Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          
          {/* Rating Pill + Flipkart Assured Badge */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1">
              <span className="bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                4.5 <Star className="w-2.5 h-2.5 fill-white" />
              </span>
              <span className="text-slate-400 text-[10px] font-medium">(180)</span>
            </div>

            {/* Flipkart Assured Badge */}
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[9px] font-black italic">
              <ShieldCheck className="w-3 h-3 text-blue-600" />
              <span>Assured ★</span>
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-1 group-hover:text-blue-600 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Free Delivery Tag */}
          <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold mt-1">
            <Truck className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Free Delivery</span>
          </div>

        </div>

        {/* Price & Add to Cart Footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-black text-slate-900">
                ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
              </span>
              <span className="text-[10px] text-slate-400 line-through">
                ₹{mrp.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 block">
              {discountPercent}% OFF
            </span>
          </div>

          <button
            disabled={isOutOfStock}
            onClick={() => addToCart(product)}
            className={`flex items-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-extrabold text-xs transition-all shadow-xs ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 hover:scale-105 active:scale-95'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>

        </div>

      </div>

    </div>
  );
}
