'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, Smartphone, Banknote, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';

export default function CheckoutModal({ isOpen, onClose }) {
  const { items, grandTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: 'Bangalore',
    state: 'Karnataka',
    postal_code: '560001',
    payment_method: 'UPI',
  });

  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (user) {
        const res = await fetchApi('/orders', {
          method: 'POST',
          body: {
            ...formData,
            items: items.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
          },
        });
        if (res.order) {
          setCompletedOrder(res.order);
          clearCart();
        }
      } else {
        // Guest simulation
        const fakeOrder = {
          order_number: 'SK-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
          total_amount: grandTotal,
          created_at: new Date().toISOString(),
          address: { ...formData },
          items: [...items],
        };
        setCompletedOrder(fakeOrder);
        clearCart();
      }
    } catch (err) {
      setError(err.message || 'Failed to place order. Please check inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl text-slate-900">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-xl font-black text-slate-900">Checkout & Payment</h2>
            <p className="text-xs text-slate-500">Provide shipping address and choose payment option</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-200 text-slate-500 hover:text-slate-900 border border-slate-200 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrder ? (
          /* Order Receipt Confirmation */
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900">Order Placed Successfully!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Thank you for shopping on ShopKart. Your order has been registered.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Order Reference:</span>
                <span className="font-extrabold text-blue-600">{completedOrder.order_number}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Deliver To:</span>
                <span className="font-bold text-slate-800">{completedOrder.address?.name || formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="font-bold text-slate-800 uppercase">{formData.payment_method}</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm">
                <span className="text-slate-700">Total Paid:</span>
                <span className="text-emerald-600">
                  ₹{parseFloat(completedOrder.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setCompletedOrder(null);
                onClose();
              }}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm shadow-md hover:bg-blue-700 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Shipping Address */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600">1. Delivery Address</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Mobile Phone Number</label>
                  <input
                    required
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-600 font-bold mb-1">Flat / House No. & Street Address</label>
                  <input
                    required
                    type="text"
                    name="address_line1"
                    value={formData.address_line1}
                    onChange={handleChange}
                    placeholder="e.g. #42, Green Avenue, Indiranagar"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">City</label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">State & Pincode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      required
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                    <input
                      required
                      type="text"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      className="bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600">2. Payment Method</h3>

              <div className="grid grid-cols-3 gap-3">
                <label
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.payment_method === 'UPI'
                      ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="UPI"
                    checked={formData.payment_method === 'UPI'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <Smartphone className="w-5 h-5 mb-1 text-blue-600" />
                  <span className="text-xs font-bold">UPI / PhonePe</span>
                </label>

                <label
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.payment_method === 'CARD'
                      ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="CARD"
                    checked={formData.payment_method === 'CARD'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <CreditCard className="w-5 h-5 mb-1 text-blue-600" />
                  <span className="text-xs font-bold">Credit/Debit Card</span>
                </label>

                <label
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.payment_method === 'COD'
                      ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="COD"
                    checked={formData.payment_method === 'COD'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <Banknote className="w-5 h-5 mb-1 text-blue-600" />
                  <span className="text-xs font-bold">Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Total Amount:</span>
                <span className="text-xl font-black text-slate-900">
                  ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting || items.length === 0}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
