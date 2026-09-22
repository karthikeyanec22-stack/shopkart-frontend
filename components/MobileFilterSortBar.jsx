'use client';

import React, { useState } from 'react';
import { ArrowUpDown, Filter, X, Check } from 'lucide-react';

export default function MobileFilterSortBar({
  sortBy,
  setSortBy,
  selectedCategory,
  setSelectedCategory,
  categories,
  totalItems,
}) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const SORT_OPTIONS = [
    { id: 'newest', label: 'Newest Arrivals' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
  ];

  return (
    <>
      {/* Mobile Sticky Bar */}
      <div className="md:hidden sticky top-[60px] z-30 bg-white border-y border-slate-200 shadow-xs px-4 py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          {/* Sort Button */}
          <button
            onClick={() => setIsSortOpen(true)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
            <span>Sort</span>
            {sortBy !== 'newest' && <span className="w-2 h-2 rounded-full bg-blue-600" />}
          </button>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all"
          >
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Filter</span>
            {selectedCategory !== 'all' && <span className="w-2 h-2 rounded-full bg-blue-600" />}
          </button>
        </div>

        <span className="text-[11px] font-extrabold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 shrink-0">
          {totalItems} Items
        </span>
      </div>

      {/* Sort Bottom Sheet */}
      {isSortOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs animate-fadeIn md:hidden">
          <div className="absolute inset-0" onClick={() => setIsSortOpen(false)} />
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl p-5 space-y-4 animate-slideUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Sort Products By</h3>
              <button
                onClick={() => setIsSortOpen(false)}
                className="p-1 rounded-full bg-slate-100 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSortBy(opt.id);
                    setIsSortOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                    sortBy === opt.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-300'
                      : 'bg-white text-slate-800 hover:bg-slate-50 border border-slate-100'
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.id && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Bottom Sheet */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs animate-fadeIn md:hidden">
          <div className="absolute inset-0" onClick={() => setIsFilterOpen(false)} />
          <div className="fixed inset-x-0 bottom-0 max-h-[80vh] bg-white rounded-t-3xl shadow-2xl p-5 flex flex-col animate-slideUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Filter Category</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-1 rounded-full bg-slate-100 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setIsFilterOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold border transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                <span>All Products</span>
                {selectedCategory === 'all' && <Check className="w-4 h-4 text-white" />}
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <span>{cat.name}</span>
                  {selectedCategory === cat.slug && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
