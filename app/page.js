'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import CategoryPills from '@/components/CategoryPills';
import ProductGrid from '@/components/ProductGrid';
import ProductDetailModal from '@/components/ProductDetailModal';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import AuthModal from '@/components/AuthModal';
import AdminModal from '@/components/AdminModal';
import OrderHistoryModal from '@/components/OrderHistoryModal';
import MobileBottomNav from '@/components/MobileBottomNav';
import MobileCategorySheet from '@/components/MobileCategorySheet';
import MobileWishlistSheet from '@/components/MobileWishlistSheet';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { fetchApi } from '@/lib/api';
import { CheckCircle2 } from 'lucide-react';

export default function Storefront() {
  const { toastMessage } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wishlist, setWishlist] = useState([]);
  const [activeNavTab, setActiveNavTab] = useState('home');

  // Modals & Bottom Sheets
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [isWishlistSheetOpen, setIsWishlistSheetOpen] = useState(false);

  // Fetch Products & Categories from Backend
  const loadStoreData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetchApi('/products').catch(() => ({ products: [] })),
        fetchApi('/categories').catch(() => ({ categories: [] })),
      ]);

      if (prodRes.products) setProducts(prodRes.products);
      if (catRes.categories) setCategories(catRes.categories);
    } catch (err) {
      console.error('Failed to load store data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStoreData();
  }, []);

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleScrollToGrid = () => {
    const gridEl = document.getElementById('catalog-section');
    if (gridEl) gridEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f3f6] text-slate-900 pb-16 md:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-2xl border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar Header */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistSheetOpen(true)}
      />

      {/* Hero Showcase Banner */}
      <HeroBanner onShopNow={handleScrollToGrid} />

      {/* Main Content Body */}
      <main id="catalog-section" className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 w-full space-y-4 sm:space-y-6">
        
        {/* Flipkart Category Pills Row */}
        <CategoryPills
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Product Catalog Grid */}
        <ProductGrid
          products={products}
          loading={loading}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          onQuickView={(prod) => setSelectedProduct(prod)}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />

      </main>

      {/* Modals & Slide-overs */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onCheckoutNow={() => setIsCheckoutOpen(true)}
      />

      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        categories={categories}
        onRefreshData={loadStoreData}
      />

      <OrderHistoryModal isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />

      {/* Flipkart Mobile Bottom Sheets */}
      <MobileCategorySheet
        isOpen={isCategorySheetOpen}
        onClose={() => setIsCategorySheetOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      <MobileWishlistSheet
        isOpen={isWishlistSheetOpen}
        onClose={() => setIsWishlistSheetOpen(false)}
        wishlistIds={wishlist}
        products={products}
        onToggleWishlist={handleToggleWishlist}
        onQuickView={(prod) => setSelectedProduct(prod)}
      />

      {/* Mobile Bottom Navigation Bar (Flipkart Style) */}
      <MobileBottomNav
        activeTab={activeNavTab}
        setActiveTab={setActiveNavTab}
        onOpenCategories={() => setIsCategorySheetOpen(true)}
        onOpenWishlist={() => setIsWishlistSheetOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        wishlistCount={wishlist.length}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
