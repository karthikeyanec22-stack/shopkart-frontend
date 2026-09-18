'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchApi } from '@/lib/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart from backend when user logs in
  useEffect(() => {
    async function loadBackendCart() {
      if (user) {
        try {
          const res = await fetchApi('/cart');
          if (res.cart && res.cart.items) {
            const formatted = res.cart.items.map((i) => ({
              id: i.id,
              product_id: i.product_id,
              name: i.product?.name,
              price: parseFloat(i.product?.price || 0),
              image: i.product?.images?.[0]?.url || i.product?.images?.[0]?.image || 'https://via.placeholder.com/300',
              quantity: i.quantity,
              stock: i.product?.stock ?? 99,
              sku: i.product?.sku,
            }));
            setItems(formatted);
          }
        } catch (e) {
          console.warn('Could not fetch user cart:', e.message);
        }
      }
    }
    loadBackendCart();
  }, [user]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = async (product, quantity = 1) => {
    const existingIndex = items.findIndex((i) => i.product_id === product.id);

    // Immediate UI update
    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += quantity;
      setItems(updated);
    } else {
      const newItem = {
        id: Date.now(), // temporary UI id
        product_id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.images?.[0]?.url || product.images?.[0]?.image || 'https://via.placeholder.com/300',
        quantity: quantity,
        stock: product.stock ?? 99,
        sku: product.sku,
      };
      setItems([...items, newItem]);
    }

    showToast(`Added "${product.name}" to cart!`);

    // Sync with backend if logged in
    if (user) {
      try {
        const res = await fetchApi('/cart/items', {
          method: 'POST',
          body: { product_id: product.id, quantity },
        });
        if (res.cart?.items) {
          const formatted = res.cart.items.map((i) => ({
            id: i.id,
            product_id: i.product_id,
            name: i.product?.name,
            price: parseFloat(i.product?.price || 0),
            image: i.product?.images?.[0]?.url || i.product?.images?.[0]?.image || 'https://via.placeholder.com/300',
            quantity: i.quantity,
            stock: i.product?.stock ?? 99,
            sku: i.product?.sku,
          }));
          setItems(formatted);
        }
      } catch (e) {
        console.error('Failed to sync item with backend:', e.message);
      }
    }
  };

  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return removeFromCart(itemId);

    const updated = items.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i));
    setItems(updated);

    if (user) {
      try {
        const res = await fetchApi(`/cart/items/${itemId}`, {
          method: 'PUT',
          body: { quantity: newQty },
        });
        if (res.cart?.items) {
          const formatted = res.cart.items.map((i) => ({
            id: i.id,
            product_id: i.product_id,
            name: i.product?.name,
            price: parseFloat(i.product?.price || 0),
            image: i.product?.images?.[0]?.url || i.product?.images?.[0]?.image || 'https://via.placeholder.com/300',
            quantity: i.quantity,
            stock: i.product?.stock ?? 99,
            sku: i.product?.sku,
          }));
          setItems(formatted);
        }
      } catch (e) {
        console.error('Failed to update qty on backend:', e.message);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setItems(items.filter((i) => i.id !== itemId));
    showToast('Item removed from cart.');

    if (user) {
      try {
        await fetchApi(`/cart/items/${itemId}`, { method: 'DELETE' });
      } catch (e) {
        console.error('Failed to delete item on backend:', e.message);
      }
    }
  };

  const clearCart = async () => {
    setItems([]);
    if (user) {
      try {
        await fetchApi('/cart', { method: 'DELETE' });
      } catch (e) {
        console.error('Failed to clear cart on backend:', e.message);
      }
    }
  };

  const totalItemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const shipping = subtotal > 999 || items.length === 0 ? 0 : 49;
  const grandTotal = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        totalItemCount,
        subtotal,
        shipping,
        grandTotal,
        isDrawerOpen,
        setIsDrawerOpen,
        toastMessage,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
