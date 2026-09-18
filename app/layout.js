import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'ShopKart - Premium Online Store',
  description: 'Shop top electronics, fashion, gaming gear, and modern home accessories.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className="min-h-screen bg-[#f1f3f6] text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
