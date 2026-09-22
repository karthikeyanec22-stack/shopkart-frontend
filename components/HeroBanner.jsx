'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Truck, Zap, ArrowRight, Star, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    tag: '★ Big Billion Days Sale',
    title: 'Super Tech Deals & Smart Devices',
    subtitle: 'Up to 60% OFF on Top Laptops, Noise-Canceling Audio & Smartwatches.',
    badge: 'Limited Time Flash Offer',
    cta: 'Shop Tech Deals',
    bgGradient: 'from-blue-700 via-indigo-800 to-slate-900',
    accentColor: 'text-amber-300',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    productName: 'SonicBlast Pro ANC Headphones',
    price: '₹12,999',
    mrp: '₹16,999',
    discount: '23% Off',
  },
  {
    id: 2,
    tag: '⚡ Flipkart Festive Rush',
    title: 'Fashion & Luxury Wardrobe Upgrade',
    subtitle: 'Explore premium streetwear, sneakers, jacket collections & designer watches.',
    badge: 'Extra ₹500 Instant Cashback',
    cta: 'Explore Fashion',
    bgGradient: 'from-purple-800 via-indigo-900 to-slate-950',
    accentColor: 'text-pink-300',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    productName: 'AeroGlide Ultra Chronograph',
    price: '₹8,499',
    mrp: '₹11,999',
    discount: '29% Off',
  },
  {
    id: 3,
    tag: '🎮 Pro Gaming Zone',
    title: 'Dominate Next-Gen Performance',
    subtitle: 'Mechanical keyboards, 4K gaming displays, and ergonomic controllers in stock.',
    badge: 'Fast 2-Day Delivery',
    cta: 'Grab Gaming Deals',
    bgGradient: 'from-emerald-800 via-teal-900 to-slate-950',
    accentColor: 'text-emerald-300',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80',
    productName: 'Viper RGB Mechanical Keyboard',
    price: '₹6,799',
    mrp: '₹9,499',
    discount: '28% Off',
  },
];

export default function HeroBanner({ onShopNow }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const banner = BANNERS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  };

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white border-b border-slate-800">
      
      {/* Banner Card Slide */}
      <div className={`relative transition-all duration-700 bg-gradient-to-r ${banner.bgGradient} py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8`}>
        
        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-xs transition-all hidden sm:flex"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-xs transition-all hidden sm:flex"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black tracking-wide uppercase text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                <span>{banner.tag}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                {banner.title}
              </h1>

              <p className="text-slate-200 text-xs sm:text-sm max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
                {banner.subtitle}
              </p>

              {/* CTAs & Urgency Counter */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={onShopNow}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>{banner.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md text-xs font-bold text-slate-200">
                  <Clock className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>Ends in: <strong className="text-amber-300">04h 12m 35s</strong></span>
                </div>
              </div>

              {/* Value Props Row */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/10 max-w-md mx-auto lg:mx-0 text-left">
                <div className="flex items-center gap-1.5 text-slate-200">
                  <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-white">Free Delivery</p>
                    <p className="text-[9px] text-slate-400">On ₹999+</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-white">100% Genuine</p>
                    <p className="text-[9px] text-slate-400">Flipkart Assured</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-200">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-white">Easy Pay</p>
                    <p className="text-[9px] text-slate-400">UPI / COD / EMI</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Featured Product Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-3 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                    ★ Deal of the Day
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    In Stock
                  </span>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src={banner.image}
                    alt={banner.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-white">
                    {banner.productName}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      4.9 <Star className="w-2.5 h-2.5 fill-white" />
                    </span>
                    <span className="text-[11px] text-slate-300 font-medium">(1,480 Flipkart Reviews)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div>
                    <span className="text-xs text-slate-400 line-through mr-2">{banner.mrp}</span>
                    <span className="text-xl font-black text-amber-300">{banner.price}</span>
                    <span className="ml-2 text-xs font-bold text-emerald-400">{banner.discount}</span>
                  </div>

                  <button
                    onClick={onShopNow}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-md transition-all"
                  >
                    Grab Deal
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {BANNERS.map((b, idx) => (
            <button
              key={b.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

      </div>

    </div>
  );
}
