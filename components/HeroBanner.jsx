'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Truck, Zap, ArrowRight, Star } from 'lucide-react';

export default function HeroBanner({ onShopNow }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white text-slate-900 border-b border-slate-200 py-10 lg:py-14">
      
      {/* Background Subtle Ambient Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Big Billion Festive Offers Live!</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900">
              Upgrade Your Tech & Style with{' '}
              <span className="text-blue-600">
                ShopKart
              </span>
            </h1>

            <p className="text-slate-600 text-base max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Top Brands. Guaranteed Low Prices. Fast Shipping. Explore verified electronics, luxury wearables, gaming gear, and modern home essentials.
            </p>

            {/* CTAs & Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 px-4 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="flex -space-x-0.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <span>4.9 / 5.0 Rating (10k+ Buyers)</span>
              </div>
            </div>

            {/* Value Props Row */}
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-200 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-left">
                <Truck className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Free Shipping</p>
                  <p className="text-[11px] text-slate-500">Orders over ₹999</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">100% Genuine</p>
                  <p className="text-[11px] text-slate-500">Brand Warranty</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <Zap className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Easy Pay</p>
                  <p className="text-[11px] text-slate-500">UPI, Cards & COD</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card Featured Highlight */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="bg-white rounded-2xl p-5 space-y-4 border border-slate-200 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
                    ★ Deal of the Day
                  </span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    In Stock
                  </span>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                    alt="SonicBlast Pro Wireless Headphones"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    SonicBlast Pro Wireless Headphones
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                    Active Noise Cancellation, 40H Battery Life, Spatial Audio Processing.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 line-through mr-2">₹16,999</span>
                    <span className="text-2xl font-black text-blue-600">₹12,999</span>
                    <span className="ml-2 text-xs font-bold text-emerald-600">23% Off</span>
                  </div>

                  <button
                    onClick={onShopNow}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
                  >
                    Grab Deal
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
