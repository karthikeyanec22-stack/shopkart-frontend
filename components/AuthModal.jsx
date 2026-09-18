'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, ShieldAlert, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegisterMode) {
        await register(formData.name, formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (email, password) => {
    setFormData({ ...formData, email, password });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl text-slate-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-8 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-900">
              {isRegisterMode ? 'Create Account' : 'Welcome to ShopKart'}
            </h2>
            <p className="text-xs text-slate-500">
              {isRegisterMode
                ? 'Sign up to track orders and save your cart'
                : 'Log in to manage your account & orders'}
            </p>
          </div>

          {/* Preset Buttons for easy testing */}
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block text-center">
              ⚡ Quick Fill Test Accounts
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillDemo('admin@shopkart.com', 'password123')}
                className="py-1.5 px-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl font-bold transition-all"
              >
                Admin Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemo('user@shopkart.com', 'password123')}
                className="py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl font-bold transition-all"
              >
                Customer Demo
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegisterMode && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name</label>
                <div className="relative flex items-center bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                  <UserIcon className="w-4 h-4 text-slate-400 ml-1 mr-2" />
                  <input
                    required
                    type="text"
                    placeholder="Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent text-slate-900 text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <div className="relative flex items-center bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                <Mail className="w-4 h-4 text-slate-400 ml-1 mr-2" />
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent text-slate-900 text-xs font-medium focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <div className="relative flex items-center bg-slate-50 border border-slate-300 rounded-xl p-2.5">
                <Lock className="w-4 h-4 text-slate-400 ml-1 mr-2" />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-transparent text-slate-900 text-xs font-medium focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{isRegisterMode ? 'Register & Continue' : 'Log In'}</span>
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="text-center pt-1">
            <button
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setError(null);
              }}
              className="text-xs text-blue-600 hover:text-blue-800 transition-colors font-bold"
            >
              {isRegisterMode
                ? 'Already have an account? Log In'
                : "New to ShopKart? Create an account"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
