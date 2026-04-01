// ─── Product Detail Page ─────────────────────────────────────────
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/helpers';
import StarRating from '../components/StarRating';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiArrowLeft, FiCheck } from 'react-icons/fi';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product,  setProduct]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [qty,      setQty]      = useState(1);
  const [added,    setAdded]    = useState(false);

  // Review form state
  const [rating,   setRating]   = useState(0);
  const [comment,  setComment]  = useState('');
  const [rLoading, setRLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.product);
      } catch { toast.error('Product not found.'); }
      finally { setLoading(false); }
    };
    fetch();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!rating) return toast.error('Please select a rating.');
    if (!comment.trim()) return toast.error('Please write a comment.');
    setRLoading(true);
    try {
      await api.post(`/reviews/${id}`, { rating, comment });
      toast.success('Review submitted! ⭐');
      setRating(0); setComment('');
      const { data } = await api.get(`/products/${id}`);
      setProduct(data.product);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review.');
    } finally { setRLoading(false); }
  };

  if (loading) return <div style={{ paddingTop: 120, textAlign: 'center' }}><div className="spinner" /></div>;
  if (!product) return <div style={{ paddingTop: 120, textAlign: 'center', color: '#a89878' }}>Product not found.</div>;

  return (
    <div className="page-enter" style={{ paddingTop: 90, paddingBottom: '4rem' }}>
      <div className="container">
        <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#665c4a', fontSize: '0.875rem', marginBottom: '2rem', marginTop: '1.5rem', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#d4a24c'}
          onMouseLeave={e => e.currentTarget.style.color = '#665c4a'}
        >
          <FiArrowLeft size={14} /> Back to Products
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

          {/* ── Image ──────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #2a2a2a', position: 'relative' }}>
              <img src={product.image} alt={product.name}
                style={{ width: '100%', height: 460, objectFit: 'cover' }}
                onError={e => e.currentTarget.src = 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600'}
              />
              {product.isFeatured && (
                <span style={{
                  position: 'absolute', top: 16, left: 16,
                  background: 'linear-gradient(135deg,#d4a24c,#b8860b)',
                  color: '#0a0a0a', padding: '0.3rem 0.9rem', borderRadius: 100,
                  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.05em',
                }}>✦ FEATURED</span>
              )}
            </div>
          </motion.div>

          {/* ── Info ───────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge badge-gold" style={{ marginBottom: '1rem', display: 'inline-block' }}>{product.category}</span>

            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#f0ead6', marginBottom: '1rem', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {/* Rating row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <StarRating value={product.rating} readonly size={18} />
              <span style={{ color: '#d4a24c', fontWeight: 600, fontSize: '0.95rem' }}>{product.rating.toFixed(1)}</span>
              <span style={{ color: '#665c4a', fontSize: '0.875rem' }}>({product.numReviews} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{
                fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700,
                background: 'linear-gradient(135deg,#f5d98b,#d4a24c)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {formatPrice(product.price)}
              </span>
            </div>

            <p style={{ color: '#a89878', lineHeight: 1.8, marginBottom: '1.75rem', fontSize: '0.95rem' }}>
              {product.description}
            </p>

            {/* Ingredients */}
            {product.ingredients?.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '0.8rem', color: '#665c4a', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Ingredients</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {product.ingredients.map(i => (
                    <span key={i} style={{ background: '#1e1e1e', border: '1px solid #2a2a2a', color: '#a89878', padding: '0.2rem 0.7rem', borderRadius: 100, fontSize: '0.78rem' }}>{i}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Flavors */}
            {product.flavors?.length > 0 && (
              <div style={{ marginBottom: '1.75rem' }}>
                <p style={{ fontSize: '0.8rem', color: '#665c4a', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Flavors</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {product.flavors.map(f => (
                    <span key={f} style={{ background: 'rgba(212,162,76,0.08)', border: '1px solid rgba(212,162,76,0.2)', color: '#d4a24c', padding: '0.2rem 0.7rem', borderRadius: 100, fontSize: '0.78rem' }}>{f}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.75rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: product.stock > 0 ? '#4caf6e' : '#e85555' }} />
              <span style={{ fontSize: '0.82rem', color: product.stock > 0 ? '#4caf6e' : '#e85555' }}>
                {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity + Add to Cart */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {/* Qty control */}
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #2a2a2a', borderRadius: 12, overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: '0.65rem 1rem', background: 'none', border: 'none', color: '#a89878', cursor: 'pointer', fontSize: '1.1rem', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#1e1e1e'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >−</button>
                <span style={{ padding: '0.65rem 0.75rem', color: '#f0ead6', minWidth: 36, textAlign: 'center', fontWeight: 500 }}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} style={{ padding: '0.65rem 1rem', background: 'none', border: 'none', color: '#a89878', cursor: 'pointer', fontSize: '1.1rem', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#1e1e1e'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >+</button>
              </div>

              <button
                className="btn btn-primary btn-lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                {added ? <><FiCheck size={18} /> Added!</> : <><FiShoppingCart size={18} /> Add to Cart</>}
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Reviews Section ──────────────────────────────────── */}
        <div style={{ marginTop: '4rem', borderTop: '1px solid #1e1e1e', paddingTop: '3rem' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#f0ead6', marginBottom: '2rem' }}>
            Customer <span className="gold-text">Reviews</span>
          </h2>

          {/* Review list */}
          {product.reviews?.length === 0 ? (
            <p style={{ color: '#665c4a', marginBottom: '2rem' }}>No reviews yet. Be the first! 🌟</p>
          ) : (
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
              {product.reviews.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 14, padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                    <div>
                      <span style={{ fontWeight: 500, color: '#d4a24c', fontSize: '0.92rem' }}>{r.name}</span>
                      <div style={{ marginTop: '0.25rem' }}><StarRating value={r.rating} readonly size={14} /></div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#665c4a' }}>{new Date(r.createdAt).toLocaleDateString('en-IN')}</span>
                  </div>
                  <p style={{ color: '#a89878', fontSize: '0.875rem', lineHeight: 1.6 }}>{r.comment}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Write a review */}
          {user ? (
            <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 16, padding: '1.75rem' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#d4a24c', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Write a Review</h3>
              <form onSubmit={handleReview}>
                <div className="form-group">
                  <label className="form-label">Your Rating</label>
                  <StarRating value={rating} onChange={setRating} size={26} />
                </div>
                <div className="form-group">
                  <label className="form-label">Your Review</label>
                  <textarea value={comment} onChange={e => setComment(e.target.value)} className="form-textarea" placeholder="Share your experience..." />
                </div>
                <button type="submit" className="btn btn-primary" disabled={rLoading}>
                  {rLoading ? 'Submitting...' : 'Submit Review ⭐'}
                </button>
              </form>
            </div>
          ) : (
            <p style={{ color: '#665c4a', fontSize: '0.875rem' }}>
              <Link to="/login" style={{ color: '#d4a24c' }}>Login</Link> to write a review.
            </p>
          )}
        </div>
      </div>
      <style>{`@media(max-width:768px){.container>div:nth-child(2){grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}