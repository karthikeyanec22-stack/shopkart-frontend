'use client';

import React, { useEffect, useState } from 'react';
import { X, Package, Calendar, Loader2 } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function OrderHistoryModal({ isOpen, onClose }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      async function loadOrders() {
        setLoading(true);
        try {
          const res = await fetchApi('/orders');
          if (res.orders) {
            setOrders(res.orders);
          }
        } catch (err) {
          console.warn('Could not fetch orders:', err.message);
        } finally {
          setLoading(false);
        }
      }
      loadOrders();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl text-slate-900">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">My Purchase History</h2>
              <p className="text-xs text-slate-500">View your past orders and delivery statuses</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-200 text-slate-500 hover:text-slate-900 border border-slate-200 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {loading ? (
            <div className="text-center py-16 text-slate-500 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="text-xs font-semibold">Fetching your orders...</span>
            </div>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 text-xs">
                  <div>
                    <span className="text-slate-500">Order Reference: </span>
                    <span className="font-extrabold text-blue-700">{order.order_number}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold uppercase text-[10px] border border-blue-200">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs py-1">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.product?.images?.[0]?.url ||
                            item.product?.images?.[0]?.image ||
                            'https://via.placeholder.com/100'
                          }
                          alt={item.product?.name}
                          className="w-10 h-10 object-cover rounded-lg bg-white border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{item.product?.name}</p>
                          <p className="text-[11px] text-slate-500">Qty: {item.quantity} × ₹{item.price}</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer Total */}
                <div className="flex justify-between items-center pt-3 border-t border-slate-200 text-xs">
                  <span className="text-slate-500">
                    Payment Mode: <strong className="text-slate-800 uppercase">{order.payment?.payment_method || 'UPI'}</strong>
                  </span>
                  <div>
                    <span className="text-slate-500 mr-2">Total Amount:</span>
                    <span className="text-base font-black text-emerald-700">
                      ₹{parseFloat(order.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <Package className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-sm font-bold text-slate-600">No previous orders found</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
