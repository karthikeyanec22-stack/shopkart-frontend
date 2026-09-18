'use client';

import React from 'react';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product, onQuickView, isWishlisted, onToggleWishlist }) {
  const { addToCart } = useCart();
  const imageUrl =
    product.images?.[0]?.url ||
    product.images?.[0]?.image ||
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group relative bg-white border border-slate-200 hover:border-blue-400 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
      
      {/* Top Image Section */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        
        {/* Category & Stock Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
          {product.category?.name && (
            <span className="px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-extrabold uppercase tracking-wider border border-slate-200 shadow-xs">
              {product.category.name}
            </span>
          )}
          {isOutOfStock ? (
            <span className="px-2.5 py-0.5 rounded-md bg-red-100 text-red-600 text-[10px] font-bold border border-red-200">
              Out of Stock
            </span>
          ) : product.stock < 10 ? (
            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
              Only {product.stock} left
            </span>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-400 hover:text-pink-500 shadow-xs transition-all hover:scale-110"
          title="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-500 text-pink-500' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={() => onQuickView(product)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-slate-900 font-bold text-xs border border-slate-200 hover:bg-slate-50 transition-all shadow-md"
          >
            <Eye className="w-4 h-4 text-blue-600" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating Badge */}
          <div className="flex items-center gap-1 text-slate-700 text-xs font-semibold mb-1">
            <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5">
              4.8 <Star className="w-2.5 h-2.5 fill-white" />
            </span>
            <span className="text-slate-500 text-[11px] ml-1">(240)</span>
          </div>

          {/* Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-slate-500 text-xs line-clamp-2 mt-0.5 font-normal">
            {product.description || 'Premium quality product engineered for longevity and performance.'}
          </p>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-400 font-semibold block -mb-0.5">Price</span>
            <span className="text-lg font-black text-slate-900">
              ₹{parseFloat(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <button
            disabled={isOutOfStock}
            onClick={() => addToCart(product)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold text-xs transition-all shadow-sm ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 hover:scale-105 active:scale-95'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

    </div>
  );
}
