// ─── Checkout Page ───────────────────────────────────────────────
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { formatPrice } from '../utils/helpers';
import CouponInput from '../components/CouponInput';
import toast from 'react-hot-toast';
import { FiCheck } from 'react-icons/fi';

export default function Checkout() {
  const { items, subtotal, clearCart, isEmpty } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:    user?.name    || '',
    address: user?.address || '',
    city:    '',
    phone:   user?.phone   || '',
  });
  const [discount,    setDiscount]    = useState(0);
  const [couponCode,  setCouponCode]  = useState('');
  const [loading,     setLoading]     = useState(false);
  const [placed,      setPlaced]      = useState(false);

  if (isEmpty) { navigate('/cart'); return null; }

  const discountAmt = Math.round(subtotal * discount / 100);
  const total       = subtotal - discountAmt;

  const handleInput = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleCoupon = (disc, code) => { setDiscount(disc); setCouponCode(code); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.city || !form.phone) {
      return toast.error('Please fill all delivery details.');
    }
    setLoading(true);
    try {
      const orderItems = items.map(i => ({
        product: i._id, name: i.name, image: i.image, price: i.price, quantity: i.quantity,
      }));
      const { data } = await api.post('/orders', {
        items: orderItems,
        shippingAddress: form,
        couponCode, discount, subtotal, totalPrice: total,
      });
      setPlaced(true);
      clearCart();
      toast.success(data.message);
      setTimeout(() => navigate('/orders'), 2500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (placed) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 70 }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 12 }}
          style={{ textAlign: 'center', padding: '3rem' }}>
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
            style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg,#d4a24c,#b8860b)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem', boxShadow: '0 0 40px rgba(212,162,76,0.4)',
            }}>
            <FiCheck size={36} color="#0a0a0a" strokeWidth={3} />
          </motion.div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#f0ead6', marginBottom: '0.75rem' }}>Order Placed! 🎉</h2>
          <p style={{ color: '#a89878' }}>Redirecting to your orders...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ paddingTop: 90, paddingBottom: '4rem' }}>
      <div className="container" style={{ paddingTop: '2rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '2rem' }}>
          <span className="gold-text">Checkout</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>

            {/* ── Delivery Details ────────────────────────────── */}
            <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 20, padding: '2rem' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: '#f0ead6', marginBottom: '1.5rem' }}>
                Delivery Details
              </h2>

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input name="name" value={form.name} onChange={handleInput} className="form-input" placeholder="Your full name" required />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleInput} className="form-input" placeholder="+91 98765 43210" required />
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Address *</label>
                <textarea name="address" value={form.address} onChange={handleInput} className="form-textarea" style={{ minHeight: 80 }} placeholder="House no., Street, Landmark..." required />
              </div>

              <div className="form-group">
                <label className="form-label">City *</label>
                <input name="city" value={form.city} onChange={handleInput} className="form-input" placeholder="City" required />
              </div>

              {/* Coupon */}
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #2a2a2a' }}>
                <label className="form-label" style={{ marginBottom: '0.75rem', display: 'block' }}>🎟️ Coupon Code</label>
                <CouponInput orderTotal={subtotal} onApply={handleCoupon} />
              </div>
            </div>

            {/* ── Order Summary ───────────────────────────────── */}
            <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 20, padding: '1.75rem', position: 'sticky', top: 90 }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: '#f0ead6', marginBottom: '1.5rem' }}>Order Summary</h2>

              {items.map(item => (
                <div key={item._id} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.9rem', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: 46, height: 46, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                    onError={e => e.currentTarget.src = 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=100'} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '0.82rem', color: '#a89878', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#665c4a' }}>× {item.quantity}</p>
                  </div>
                  <span style={{ fontSize: '0.88rem', color: '#d4a24c', fontWeight: 500, flexShrink: 0 }}>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}

              <div style={{ borderTop: '1px solid #2a2a2a', marginTop: '1rem', paddingTop: '1rem' }}>
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                {discount > 0 && <Row label={`Discount (${discount}%)`} value={`− ${formatPrice(discountAmt)}`} color="#4caf6e" />}
                <div style={{ borderTop: '1px solid #2a2a2a', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#a89878', fontWeight: 500 }}>Total</span>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, background: 'linear-gradient(135deg,#f5d98b,#d4a24c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '1.25rem' }} disabled={loading}>
                {loading ? 'Placing Order...' : '🎉 Place Order'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#3a3228', marginTop: '0.75rem' }}>
                Cash on Delivery · Secure Checkout
              </p>
            </div>
          </div>
        </form>
      </div>
      <style>{`@media(max-width:900px){form>div{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

function Row({ label, value, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
      <span style={{ fontSize: '0.82rem', color: '#665c4a' }}>{label}</span>
      <span style={{ fontSize: '0.82rem', color: color || '#a89878' }}>{value}</span>
    </div>
  );
}