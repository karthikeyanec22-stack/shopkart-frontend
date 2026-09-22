'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import MobileFilterSortBar from './MobileFilterSortBar';
import { PackageSearch, ArrowUpDown } from 'lucide-react';

export default function ProductGrid({
  products,
  loading,
  searchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  onQuickView,
  wishlist,
  onToggleWishlist,
}) {
  const [sortBy, setSortBy] = useState('newest');

  // Filter products based on search term and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !searchTerm ||
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || p.category?.slug === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === 'price-high') return parseFloat(b.price) - parseFloat(a.price);
    return b.id - a.id;
  });

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 py-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div
            key={n}
            className="bg-white border border-slate-200 rounded-2xl p-3 h-80 animate-pulse flex flex-col justify-between shadow-xs"
          >
            <div className="bg-slate-200 rounded-xl h-40 w-full" />
            <div className="space-y-2 mt-3">
              <div className="bg-slate-200 h-4 rounded w-3/4" />
              <div className="bg-slate-200 h-3 rounded w-1/2" />
              <div className="bg-slate-200 h-8 rounded w-full mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Mobile Sticky Filter & Sort Bar */}
      <MobileFilterSortBar
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        totalItems={sortedProducts.length}
      />

      {/* Desktop Grid Controls Header */}
      <div className="hidden md:flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Explore Products</span>
            <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
              {sortedProducts.length} Items
            </span>
          </h2>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-slate-500" />
          <span className="text-xs text-slate-600 font-bold">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-300 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl focus:outline-none focus:border-blue-600 cursor-pointer shadow-xs"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Cards 2-Column Mobile Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {sortedProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onQuickView={onQuickView}
              isWishlisted={wishlist.includes(prod.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-xs my-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No products match your search</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category filter.
          </p>
        </div>
      )}

    </div>
  );
}
