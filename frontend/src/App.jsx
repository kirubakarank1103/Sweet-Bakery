// ─── App — Route Setup ───────────────────────────────────────────
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar          from './components/Navbar';
import Footer          from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Preloader       from './components/Preloader';
import ProtectedRoute  from './components/ProtectedRoute';
import AdminRoute      from './components/AdminRoute';
import Home            from './pages/Home';
import Products        from './pages/Products';
import ProductDetail   from './pages/ProductDetail';
import Cart            from './pages/Cart';
import Checkout        from './pages/Checkout';
import About           from './pages/About';
import Contact         from './pages/Contact';
import Login           from './pages/Login';
import Register        from './pages/Register';
import OrderHistory    from './pages/OrderHistory';
import AdminPanel      from './pages/AdminPanel';
import AdminOrders     from './pages/AdminOrders';
import { useState, useEffect } from 'react';

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show preloader only on first visit
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  const hideLayout = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Navbar />}
      <main style={{ minHeight: '80vh' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public */}
            <Route path="/"          element={<Home />} />
            <Route path="/products"  element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about"     element={<About />} />
            <Route path="/contact"   element={<Contact />} />
            <Route path="/cart"      element={<Cart />} />
            <Route path="/login"     element={<Login />} />
            <Route path="/register"  element={<Register />} />

            {/* Private */}
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/orders"   element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin"        element={<AdminRoute><AdminPanel /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
          </Routes>
        </AnimatePresence>
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}