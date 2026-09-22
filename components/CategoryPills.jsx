'use client';

import React from 'react';
import { Layers, Laptop, Shirt, Gamepad2, Home, Footprints, Sparkles, Dumbbell, Gift } from 'lucide-react';

const CATEGORY_CONFIG = {
  electronics: { icon: Laptop, bg: 'bg-blue-100 text-blue-600 border-blue-200' },
  fashion: { icon: Shirt, bg: 'bg-pink-100 text-pink-600 border-pink-200' },
  gaming: { icon: Gamepad2, bg: 'bg-purple-100 text-purple-600 border-purple-200' },
  'home-lifestyle': { icon: Home, bg: 'bg-emerald-100 text-emerald-600 border-emerald-200' },
  footwear: { icon: Footprints, bg: 'bg-amber-100 text-amber-700 border-amber-200' },
  'beauty-wellness': { icon: Sparkles, bg: 'bg-rose-100 text-rose-600 border-rose-200' },
  'sports-fitness': { icon: Dumbbell, bg: 'bg-teal-100 text-teal-600 border-teal-200' },
  'toys-hobbies': { icon: Gift, bg: 'bg-indigo-100 text-indigo-600 border-indigo-200' },
};

export default function CategoryPills({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="w-full bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Category Icons Row - Flipkart Mobile Circle Bubbles */}
      <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto scrollbar-none pb-1 snap-x">
        
        {/* All Products Bubble */}
        <button
          onClick={() => setSelectedCategory('all')}
          className="flex flex-col items-center gap-1.5 shrink-0 snap-start group cursor-pointer focus:outline-none"
        >
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-xs ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white border-blue-600 ring-4 ring-blue-100 scale-105'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            <Layers className="w-6 h-6" />
          </div>
          <span
            className={`text-[11px] sm:text-xs font-bold whitespace-nowrap transition-colors ${
              selectedCategory === 'all' ? 'text-blue-600 font-black' : 'text-slate-700 group-hover:text-blue-600'
            }`}
          >
            All Products
          </span>
        </button>

        {/* Category Item Bubbles */}
        {categories.map((cat) => {
          const config = CATEGORY_CONFIG[cat.slug] || {
            icon: Layers,
            bg: 'bg-slate-100 text-slate-700 border-slate-200',
          };
          const IconComponent = config.icon;
          const isSelected = selectedCategory === cat.slug;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className="flex flex-col items-center gap-1.5 shrink-0 snap-start group cursor-pointer focus:outline-none"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-xs ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 ring-4 ring-blue-100 scale-105'
                    : `${config.bg} hover:scale-105`
                }`}
              >
                <IconComponent className="w-6 h-6" />
              </div>
              <span
                className={`text-[11px] sm:text-xs font-bold whitespace-nowrap transition-colors ${
                  isSelected ? 'text-blue-600 font-black' : 'text-slate-700 group-hover:text-blue-600'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
}
