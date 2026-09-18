'use client';

import React from 'react';
import { Layers, Laptop, Shirt, Gamepad2, Home, Footprints, Sparkles, Dumbbell, Gift } from 'lucide-react';

const CATEGORY_ICONS = {
  electronics: Laptop,
  fashion: Shirt,
  gaming: Gamepad2,
  'home-lifestyle': Home,
  footwear: Footprints,
  'beauty-wellness': Sparkles,
  'sports-fitness': Dumbbell,
  'toys-hobbies': Gift,
};

export default function CategoryPills({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full">
      <button
        onClick={() => setSelectedCategory('all')}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
          selectedCategory === 'all'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm'
        }`}
      >
        <Layers className="w-4 h-4" />
        <span>All Products</span>
      </button>

      {categories.map((cat) => {
        const IconComponent = CATEGORY_ICONS[cat.slug] || Layers;
        const isSelected = selectedCategory === cat.slug;

        return (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              isSelected
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm'
            }`}
          >
            <IconComponent className="w-4 h-4" />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
