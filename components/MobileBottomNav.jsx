'use client';

import React from 'react';
import { Home, Grid, Heart, Package, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function MobileBottomNav({
  activeTab,
  setActiveTab,
  onOpenCategories,
  onOpenWishlist,
  onOpenOrders,
  onOpenAuth,
  wishlistCount = 0,
}) {
  const { totalItemCount, setIsDrawerOpen } = useCart();
  const { user } = useAuth();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-2 py-1.5 flex items-center justify-around">
      
      {/* 1. Home Button */}
      <button
        onClick={() => {
          setActiveTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
          activeTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className={`w-5 h-5 ${activeTab === 'home' ? 'scale-110 text-blue-600' : ''}`} />
        <span className="text-[10px] mt-0.5 font-semibold">Home</span>
      </button>

      {/* 2. Categories Button */}
      <button
        onClick={() => {
          setActiveTab('categories');
          onOpenCategories();
        }}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
          activeTab === 'categories' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Grid className={`w-5 h-5 ${activeTab === 'categories' ? 'scale-110 text-blue-600' : ''}`} />
        <span className="text-[10px] mt-0.5 font-semibold">Categories</span>
      </button>

      {/* 3. Wishlist Button */}
      <button
        onClick={() => {
          setActiveTab('wishlist');
          onOpenWishlist();
        }}
        className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
          activeTab === 'wishlist' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <div className="relative">
          <Heart className={`w-5 h-5 ${activeTab === 'wishlist' ? 'scale-110 text-pink-500 fill-pink-500' : ''}`} />
          {wishlistCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 bg-pink-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {wishlistCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 font-semibold">Wishlist</span>
      </button>

      {/* 4. Orders / Account Button */}
      <button
        onClick={() => {
          setActiveTab('orders');
          if (user) {
            onOpenOrders();
          } else {
            onOpenAuth();
          }
        }}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
          activeTab === 'orders' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        {user ? (
          <Package className={`w-5 h-5 ${activeTab === 'orders' ? 'scale-110 text-blue-600' : ''}`} />
        ) : (
          <User className={`w-5 h-5 ${activeTab === 'orders' ? 'scale-110 text-blue-600' : ''}`} />
        )}
        <span className="text-[10px] mt-0.5 font-semibold">{user ? 'Orders' : 'Account'}</span>
      </button>

      {/* 5. Cart Button */}
      <button
        onClick={() => {
          setIsDrawerOpen(true);
        }}
        className="relative flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 hover:text-slate-800 transition-all"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-amber-500 fill-amber-400" />
          {totalItemCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 bg-blue-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {totalItemCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 font-bold text-amber-600">Cart</span>
      </button>

    </nav>
  );
}
