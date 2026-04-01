// ─── App Entry Point ─────────────────────────────────────────────
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
          {/* Toast notifications — gold themed */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#161616',
                color: '#f0ead6',
                border: '1px solid #2a2a2a',
                borderRadius: '12px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.9rem',
              },
              success: {
                iconTheme: { primary: '#d4a24c', secondary: '#0a0a0a' },
              },
              error: {
                iconTheme: { primary: '#e85555', secondary: '#0a0a0a' },
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);