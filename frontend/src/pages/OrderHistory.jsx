// ─── Order History Page ──────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { formatPrice, formatDate, statusColor } from '../utils/helpers';

export default function OrderHistory() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/my-orders')
      .then(({ data }) => setOrders(data.orders))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-enter" style={{ paddingTop: 90, paddingBottom: '4rem' }}>
      <div className="container" style={{ paddingTop: '2rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '2rem' }}>
          My <span className="gold-text">Orders</span>
        </h1>

        {loading ? (
          <div className="spinner" />
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📦</div>
            <h3 style={{ color: '#a89878' }}>No orders yet</h3>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {orders.map((order, i) => (
              <motion.div key={order._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 16, overflow: 'hidden' }}>
                {/* Order header */}
                <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#665c4a' }}>Order ID</p>
                    <p style={{ fontSize: '0.82rem', color: '#d4a24c', fontFamily: 'monospace' }}>#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.75rem', color: '#665c4a' }}>{formatDate(order.createdAt)}</p>
                    <span style={{ display: 'inline-block', padding: '0.2rem 0.7rem', borderRadius: 100, fontSize: '0.72rem', fontWeight: 600, background: `${statusColor(order.status)}20`, color: statusColor(order.status), border: `1px solid ${statusColor(order.status)}40` }}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div style={{ padding: '1rem 1.5rem' }}>
                  {order.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.6rem' }}>
                      <img src={item.image} alt={item.name} style={{ width: 42, height: 42, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                        onError={e => e.currentTarget.src = 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=100'} />
                      <span style={{ flex: 1, fontSize: '0.875rem', color: '#a89878' }}>{item.name}</span>
                      <span style={{ fontSize: '0.82rem', color: '#665c4a' }}>× {item.quantity}</span>
                      <span style={{ fontSize: '0.88rem', color: '#d4a24c' }}>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ padding: '0.75rem 1.5rem', background: '#0f0f0f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#665c4a' }}>
                    {order.shippingAddress.city} · {order.shippingAddress.phone}
                  </span>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, background: 'linear-gradient(135deg,#f5d98b,#d4a24c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {formatPrice(order.totalPrice)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}