'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchApi, setAuthToken, getAuthToken } from '@/lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check current user on mount
  useEffect(() => {
    async function checkAuth() {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchApi('/me');
        if (data.user) {
          setUser(data.user);
        } else {
          setAuthToken(null);
        }
      } catch (err) {
        console.warn('Auth check failed:', err.message);
        setAuthToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const data = await fetchApi('/login', {
      method: 'POST',
      body: { email, password },
    });
    if (data.token && data.user) {
      setAuthToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const register = async (name, email, password) => {
    const data = await fetchApi('/register', {
      method: 'POST',
      body: { name, email, password },
    });
    if (data.token && data.user) {
      setAuthToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const logout = async () => {
    try {
      await fetchApi('/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    } finally {
      setAuthToken(null);
      setUser(null);
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
