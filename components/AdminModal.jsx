'use client';

import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, Layers, PackagePlus } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function AdminModal({ isOpen, onClose, products, categories, onRefreshData }) {
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // New product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    slug: '',
    category_id: categories[0]?.id || 1,
    price: '',
    stock: 20,
    sku: '',
    description: '',
  });

  // New category form
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
  });

  if (!isOpen) return null;

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const generatedSlug = newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const generatedSku = newProduct.sku || 'SKU-' + Math.random().toString(36).substring(2, 7).toUpperCase();

    try {
      await fetchApi('/products', {
        method: 'POST',
        body: {
          ...newProduct,
          slug: generatedSlug,
          sku: generatedSku,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
        },
      });

      setMessage('Product created successfully!');
      setNewProduct({
        name: '',
        slug: '',
        category_id: categories[0]?.id || 1,
        price: '',
        stock: 20,
        sku: '',
        description: '',
      });
      onRefreshData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetchApi(`/products/${id}`, { method: 'DELETE' });
      setMessage('Product deleted successfully');
      onRefreshData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const generatedSlug = newCategory.slug || newCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    try {
      await fetchApi('/categories', {
        method: 'POST',
        body: {
          ...newCategory,
          slug: generatedSlug,
        },
      });

      setMessage('Category created successfully!');
      setNewCategory({ name: '', slug: '', description: '' });
      onRefreshData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl text-slate-900">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">ShopKart Admin Control</h2>
              <p className="text-xs text-slate-500">Manage database products and categories in MySQL</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-200 text-slate-500 hover:text-slate-900 border border-slate-200 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-6 gap-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 font-bold text-xs flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <PackagePlus className="w-4 h-4" />
            <span>Manage Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`py-3 font-bold text-xs flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'categories'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Manage Categories ({categories.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          
          {message && (
            <div className="p-3 bg-purple-50 border border-purple-200 text-purple-700 rounded-xl text-xs font-bold">
              {message}
            </div>
          )}

          {activeTab === 'products' ? (
            <div className="space-y-6">
              
              {/* Form Create Product */}
              <form onSubmit={handleCreateProduct} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-700">
                  + Add New Product
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Product Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Wireless Headphones"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Category</label>
                    <select
                      value={newProduct.category_id}
                      onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Price (₹)</label>
                    <input
                      required
                      type="number"
                      placeholder="4999.00"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Stock Quantity</label>
                    <input
                      required
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-bold mb-1">Description</label>
                    <textarea
                      rows={2}
                      placeholder="Product specifications..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Product'}
                </button>
              </form>

              {/* Existing Products List */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Current Database Inventory
                </h3>

                <div className="space-y-2">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl text-xs shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                          <img
                            src={p.images?.[0]?.url || p.images?.[0]?.image || 'https://via.placeholder.com/150'}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{p.name}</p>
                          <p className="text-[11px] text-slate-500">
                            Category: {p.category?.name} • Stock: {p.stock} units
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-extrabold text-blue-700">₹{parseFloat(p.price).toFixed(2)}</span>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* Manage Categories Tab */
            <div className="space-y-6">
              
              <form onSubmit={handleCreateCategory} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-700">
                  + Add New Category
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Category Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Footwear & Shoes"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Description</label>
                    <input
                      type="text"
                      placeholder="Short summary..."
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50"
                >
                  Save Category
                </button>
              </form>

              <div className="space-y-2">
                {categories.map((c) => (
                  <div key={c.id} className="p-3 bg-white border border-slate-200 rounded-xl text-xs flex justify-between shadow-xs">
                    <div>
                      <p className="font-bold text-slate-900">{c.name}</p>
                      <p className="text-[11px] text-slate-500">{c.description || 'No description'}</p>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">{c.slug}</span>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
