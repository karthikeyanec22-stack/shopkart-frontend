'use client';

import React from 'react';
import { X, Layers, Laptop, Shirt, Gamepad2, Home, Footprints, Sparkles, Dumbbell, Gift, ChevronRight } from 'lucide-react';

const CATEGORY_ICONS = {
  electronics: { icon: Laptop, color: 'bg-blue-100 text-blue-600 border-blue-200' },
  fashion: { icon: Shirt, color: 'bg-pink-100 text-pink-600 border-pink-200' },
  gaming: { icon: Gamepad2, color: 'bg-purple-100 text-purple-600 border-purple-200' },
  'home-lifestyle': { icon: Home, color: 'bg-emerald-100 text-emerald-600 border-emerald-200' },
  footwear: { icon: Footprints, color: 'bg-amber-100 text-amber-700 border-amber-200' },
  'beauty-wellness': { icon: Sparkles, color: 'bg-rose-100 text-rose-600 border-rose-200' },
  'sports-fitness': { icon: Dumbbell, color: 'bg-teal-100 text-teal-600 border-teal-200' },
  'toys-hobbies': { icon: Gift, color: 'bg-indigo-100 text-indigo-600 border-indigo-200' },
};

export default function MobileCategorySheet({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs animate-fadeIn md:hidden">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
        
        {/* Top Handle bar */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-3 shrink-0" />

        {/* Header */}
        <div className="px-5 pb-3 flex items-center justify-between border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>All Categories</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                Flipkart Store
              </span>
            </h3>
            <p className="text-xs text-slate-500">Explore products by category</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          
          {/* All Categories Option */}
          <button
            onClick={() => {
              onSelectCategory('all');
              onClose();
            }}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-500/20'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Layers className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="font-extrabold text-sm text-slate-900">All Products</h4>
                <p className="text-xs text-slate-500">Browse complete catalog</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          {/* Dynamic Categories */}
          {categories.map((cat) => {
            const config = CATEGORY_ICONS[cat.slug] || {
              icon: Layers,
              color: 'bg-slate-100 text-slate-600 border-slate-200',
            };
            const IconComponent = config.icon;
            const isSelected = selectedCategory === cat.slug;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.slug);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shadow-xs ${config.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-sm text-slate-900">{cat.name}</h4>
                    <p className="text-xs text-slate-500">{cat.description || 'Top deals & offers'}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            );
          })}

        </div>

      </div>
    </div>
  );
}
