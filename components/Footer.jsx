'use client';

import React from 'react';
import { ShoppingBag, Heart, ShieldCheck, Truck, Headphones } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-800 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Express Delivery</h4>
              <p className="text-[11px] text-slate-500">Free shipping over ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">100% Genuine Guarantee</h4>
              <p className="text-[11px] text-slate-500">Official brand warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">24/7 Customer Care</h4>
              <p className="text-[11px] text-slate-500">Fast help desk support</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-700 shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Easy 7-Day Returns</h4>
              <p className="text-[11px] text-slate-500">Hassle-free replacement</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-black italic tracking-wide text-blue-600">
                ShopKart
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              India's leading destination for electronics, fashion, gaming, and lifestyle products with genuine warranty and fast dispatch.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="email"
                placeholder="Enter email for newsletter"
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm">
                Subscribe
              </button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">About</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
              <li className="hover:text-blue-600 cursor-pointer">About Us</li>
              <li className="hover:text-blue-600 cursor-pointer">Careers</li>
              <li className="hover:text-blue-600 cursor-pointer">ShopKart Stories</li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Help & Support</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="hover:text-blue-600 cursor-pointer">Payments & Security</li>
              <li className="hover:text-blue-600 cursor-pointer">Shipping & Logistics</li>
              <li className="hover:text-blue-600 cursor-pointer">Cancellation & Returns</li>
              <li className="hover:text-blue-600 cursor-pointer">FAQ & Help Center</li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Backend System</h4>
            <p className="text-xs text-slate-600">
              Powered by <span className="text-blue-600 font-bold">Laravel 11 REST API</span> & <span className="text-blue-600 font-bold">MySQL</span> database with Sanctum authentication.
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 ShopKart Online Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Use</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
