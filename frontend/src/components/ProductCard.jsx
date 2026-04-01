// ─── Product Card ─────────────────────────────────────────────────
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { formatPrice, truncate } from '../utils/helpers';
import { FiShoppingCart, FiStar } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="card"
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* Image */}
      <Link to={`/products/${product._id}`} style={{ display: 'block', overflow: 'hidden', position: 'relative' }}>
        <div style={{ overflow: 'hidden', height: 220 }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            onError={e => e.currentTarget.src = 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600'}
          />
        </div>

        {/* Category badge */}
        <span style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(6px)',
          border: '1px solid rgba(212,162,76,0.3)', color: '#d4a24c',
          padding: '0.2rem 0.6rem', borderRadius: 6,
          fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em',
        }}>
          {product.category}
        </span>

        {product.isFeatured && (
          <span style={{
            position: 'absolute', top: 12, right: 12,
            background: 'linear-gradient(135deg,#d4a24c,#b8860b)',
            color: '#0a0a0a', padding: '0.2rem 0.6rem', borderRadius: 6,
            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em',
          }}>
            ✦ FEATURED
          </span>
        )}
      </Link>

      {/* Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.05rem', color: '#f0ead6', marginBottom: '0.4rem',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#d4a24c'}
            onMouseLeave={e => e.currentTarget.style.color = '#f0ead6'}
          >
            {product.name}
          </h3>
        </Link>

        <p style={{ fontSize: '0.82rem', color: '#665c4a', lineHeight: 1.6, flex: 1, marginBottom: '1rem' }}>
          {truncate(product.description, 80)}
        </p>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.1rem' }}>
            {[1,2,3,4,5].map(s => (
              <FiStar key={s} size={12}
                style={{ color: s <= Math.round(product.rating) ? '#d4a24c' : '#2a2a2a', fill: s <= Math.round(product.rating) ? '#d4a24c' : 'transparent' }}
              />
            ))}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#665c4a' }}>({product.numReviews})</span>
        </div>

        {/* Price + Add to cart */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 600,
            background: 'linear-gradient(135deg,#f5d98b,#d4a24c)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {formatPrice(product.price)}
          </span>

          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <FiShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}