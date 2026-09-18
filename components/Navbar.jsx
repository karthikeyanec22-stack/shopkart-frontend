'use client';

import React from 'react';
import { ShoppingBag, Search, User, LogOut, ShieldCheck, Heart, Package } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  onOpenAuth,
  onOpenAdmin,
  onOpenOrders,
  wishlistCount,
}) {
  const { user, isAdmin, logout } = useAuth();
  const { totalItemCount, setIsDrawerOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-blue-600 border-b border-blue-700 text-white shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setSelectedCategory('all')}>
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <span className="text-2xl font-black italic tracking-wide text-white drop-shadow-sm">
                ShopKart
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-amber-300 -mt-1">
                Explore Plus ★
              </span>
            </div>
          </div>

          {/* Search Bar & Category Dropdown */}
          <div className="hidden md:flex flex-1 max-w-2xl items-center gap-2 bg-white rounded-lg p-1.5 shadow-inner border border-slate-200 focus-within:ring-2 focus-within:ring-amber-400 transition-all">
            <div className="relative flex-1 flex items-center">
              <Search className="w-4 h-4 text-slate-400 ml-3 mr-2" />
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none pr-3 font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs text-slate-400 hover:text-slate-600 mr-3 font-semibold"
                >
                  CLEAR
                </button>
              )}
            </div>

            <div className="h-5 w-[1px] bg-slate-200"></div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-slate-700 text-xs font-bold px-3 py-1 focus:outline-none cursor-pointer hover:text-blue-600"
            >
              <option value="all" className="bg-white text-slate-900">
                All Categories
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug} className="bg-white text-slate-900">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Wishlist Counter */}
            <button
              className="relative p-2 rounded-lg bg-blue-700/60 hover:bg-blue-700 text-white border border-blue-500/50 transition-all group"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Badge Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <ShoppingBag className="w-5 h-5 text-slate-950" />
              <span className="hidden sm:inline font-bold">Cart</span>
              <span className="bg-slate-950 text-white text-xs font-extrabold px-2 py-0.5 rounded-full">
                {totalItemCount}
              </span>
            </button>

            {/* User Account / Admin Actions */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-blue-500/60">
                {isAdmin && (
                  <button
                    onClick={onOpenAdmin}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-900/60 border border-purple-400/50 text-purple-100 hover:bg-purple-800/80 text-xs font-bold transition-all"
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-300" />
                    <span className="hidden lg:inline">Admin Portal</span>
                  </button>
                )}

                <button
                  onClick={onOpenOrders}
                  className="p-2 rounded-lg bg-blue-700/60 hover:bg-blue-700 text-white border border-blue-500/50 transition-all"
                  title="My Orders"
                >
                  <Package className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 pl-1">
                  <div className="w-8 h-8 rounded-lg bg-white text-blue-700 font-black text-sm flex items-center justify-center shadow-sm">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-700 transition-all"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-blue-50 text-sm font-extrabold shadow-sm transition-all"
              >
                <User className="w-4 h-4 text-blue-600" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3">
          <div className="relative flex items-center bg-white rounded-lg p-2 shadow-inner">
            <Search className="w-4 h-4 text-slate-400 ml-2 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none"
            />
          </div>
        </div>

      </div>
    </header>
  );
}
