// ─── Admin Orders Page ───────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { formatPrice, formatDate, statusColor } from '../utils/helpers';
import toast from 'react-hot-toast';

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrders() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.get('/admin/orders').then(({ data }) => setOrders(data.orders)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/orders/${id}/status`, { status });
      toast.success(`Order marked as ${status}`);
      load();
    } catch { toast.error('Update failed.'); }
  };

  return (
    <div className="page-enter" style={{ paddingTop: 90, paddingBottom: '4rem', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: '2rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '2rem' }}>
          All <span className="gold-text">Orders</span>
          <span style={{ fontSize: '1rem', color: '#665c4a', fontFamily: 'DM Sans, sans-serif', marginLeft: '0.75rem' }}>({orders.length})</span>
        </h1>

        {loading ? <div className="spinner" /> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map((order, i) => (
              <motion.div key={order._id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 14 }}>
                <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontSize: '0.7rem', color: '#665c4a' }}>ORDER</p>
                      <p style={{ fontSize: '0.82rem', color: '#d4a24c', fontFamily: 'monospace' }}>#{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.7rem', color: '#665c4a' }}>CUSTOMER</p>
                      <p style={{ fontSize: '0.875rem', color: '#a89878' }}>{order.user?.name || 'Guest'}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.7rem', color: '#665c4a' }}>DATE</p>
                      <p style={{ fontSize: '0.82rem', color: '#a89878' }}>{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.7rem', color: '#665c4a' }}>TOTAL</p>
                      <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#d4a24c', fontSize: '1rem' }}>{formatPrice(order.totalPrice)}</p>
                    </div>
                  </div>

                  {/* Status selector */}
                  <select
                    value={order.status}
                    onChange={e => updateStatus(order._id, e.target.value)}
                    style={{
                      background: `${statusColor(order.status)}15`,
                      border: `1px solid ${statusColor(order.status)}40`,
                      color: statusColor(order.status),
                      borderRadius: 8, padding: '0.4rem 0.8rem',
                      fontSize: '0.82rem', cursor: 'pointer', fontWeight: 600,
                      outline: 'none',
                    }}
                  >
                    {STATUSES.map(s => <option key={s} value={s} style={{ background: '#161616', color: '#f0ead6' }}>{s}</option>)}
                  </select>
                </div>

                <div style={{ padding: '0.8rem 1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {order.items.slice(0, 4).map((item, j) => (
                      <img key={j} src={item.image} alt={item.name} style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover', border: '1px solid #2a2a2a' }}
                        onError={e => e.currentTarget.src = 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=80'} />
                    ))}
                    {order.items.length > 4 && <div style={{ width: 36, height: 36, borderRadius: 6, background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#665c4a' }}>+{order.items.length - 4}</div>}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#665c4a' }}>
                    {order.shippingAddress.name} · {order.shippingAddress.city} · {order.shippingAddress.phone}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}