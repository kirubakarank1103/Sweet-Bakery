// ─── Cart Page ───────────────────────────────────────────────────
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import { FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, isEmpty, totalItems } = useCart();

  return (
    <div className="page-enter" style={{ paddingTop: 90, paddingBottom: '4rem' }}>
      <div className="container" style={{ paddingTop: '2rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>
          Your <span className="gold-text">Cart</span>
        </h1>
        <p style={{ color: '#665c4a', marginBottom: '2.5rem', fontSize: '0.875rem' }}>
          {isEmpty ? 'No items yet' : `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart`}
        </p>

        {isEmpty ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🛒</div>
            <h2 style={{ color: '#a89878', fontFamily: 'Playfair Display, serif', marginBottom: '0.75rem' }}>Your cart is empty</h2>
            <p style={{ color: '#665c4a', marginBottom: '2rem' }}>Looks like you haven't added anything yet</p>
            <Link to="/products" className="btn btn-primary btn-lg">Shop Now ✦</Link>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'start' }}>

            {/* ── Cart Items ──────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div key={item._id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex', gap: '1.25rem', alignItems: 'center',
                      background: '#161616', border: '1px solid #2a2a2a',
                      borderRadius: 16, padding: '1.25rem',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#d4a24c'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}
                  >
                    {/* Image */}
                    <Link to={`/products/${item._id}`}>
                      <img src={item.image} alt={item.name}
                        style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }}
                        onError={e => e.currentTarget.src = 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=200'}
                      />
                    </Link>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link to={`/products/${item._id}`} style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: '#f0ead6', marginBottom: '0.25rem', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#d4a24c'}
                          onMouseLeave={e => e.currentTarget.style.color = '#f0ead6'}
                        >{item.name}</h3>
                      </Link>
                      <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>{item.category}</span>
                    </div>

                    {/* Qty control */}
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #2a2a2a', borderRadius: 10, overflow: 'hidden' }}>
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        style={{ padding: '0.5rem 0.85rem', background: 'none', border: 'none', color: '#a89878', cursor: 'pointer', fontSize: '1rem', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#1e1e1e'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >−</button>
                      <span style={{ padding: '0.5rem 0.6rem', minWidth: 32, textAlign: 'center', color: '#f0ead6', fontWeight: 500 }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        style={{ padding: '0.5rem 0.85rem', background: 'none', border: 'none', color: '#a89878', cursor: 'pointer', fontSize: '1rem', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#1e1e1e'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >+</button>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right', minWidth: 90 }}>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 600, background: 'linear-gradient(135deg,#f5d98b,#d4a24c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#665c4a' }}>{formatPrice(item.price)} each</div>
                    </div>

                    {/* Remove */}
                    <button onClick={() => removeFromCart(item._id)}
                      style={{ background: 'none', border: 'none', color: '#665c4a', cursor: 'pointer', padding: '0.4rem', borderRadius: 8, transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#e85555'; e.currentTarget.style.background = 'rgba(232,85,85,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#665c4a'; e.currentTarget.style.background = 'none'; }}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ── Order Summary ───────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 20, padding: '1.75rem', position: 'sticky', top: 90 }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: '#f0ead6', marginBottom: '1.5rem' }}>Order Summary</h2>

              {items.map(item => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.82rem', color: '#665c4a' }}>{item.name} × {item.quantity}</span>
                  <span style={{ fontSize: '0.82rem', color: '#a89878' }}>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}

              <div style={{ borderTop: '1px solid #2a2a2a', margin: '1.25rem 0', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#a89878', fontSize: '0.9rem' }}>Subtotal</span>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700, background: 'linear-gradient(135deg,#f5d98b,#d4a24c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#3a3228', marginTop: '0.5rem' }}>Taxes and delivery calculated at checkout</p>
              </div>

              <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                Proceed to Checkout <FiArrowRight size={16} />
              </Link>

              <Link to="/products" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', fontSize: '0.82rem', color: '#665c4a' }}
                onMouseEnter={e => e.currentTarget.style.color = '#d4a24c'}
                onMouseLeave={e => e.currentTarget.style.color = '#665c4a'}
              >
                <FiShoppingBag size={14} /> Continue Shopping
              </Link>
            </motion.div>
          </div>
        )}
      </div>
      <style>{`@media(max-width:900px){.container>div:nth-child(3){grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}