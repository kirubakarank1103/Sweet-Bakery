// ─── Home Page ───────────────────────────────────────────────────
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get('/products?featured=true').then(({ data }) => setFeatured(data.products.slice(0, 4)));
  }, []);

  return (
    <div className="page-enter">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0f0c07 50%, #0a0a0a 100%)',
        paddingTop: 70,
      }}>
        {/* Animated gold orbs */}
        {[
          { w: 500, h: 500, top: '-20%', left: '-10%', opacity: 0.04 },
          { w: 350, h: 350, top: '60%',  right: '-8%', opacity: 0.06 },
          { w: 200, h: 200, top: '30%',  left: '60%',  opacity: 0.03 },
        ].map((orb, i) => (
          <div key={i} style={{
            position: 'absolute', width: orb.w, height: orb.h,
            top: orb.top, left: orb.left, right: orb.right,
            background: 'radial-gradient(circle, #d4a24c, transparent 70%)',
            opacity: orb.opacity, borderRadius: '50%',
            animation: `pulse ${3 + i}s ease-in-out infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Grid texture overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.025,
          backgroundImage: 'linear-gradient(#d4a24c 1px, transparent 1px), linear-gradient(90deg, #d4a24c 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-grid" className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

            {/* Left: Text */}
            <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.15 } } }}>
              <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(212,162,76,0.1)', border: '1px solid rgba(212,162,76,0.3)',
                  color: '#d4a24c', padding: '0.3rem 1rem', borderRadius: 100,
                  fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                }}>
                  ✦ Premium Handcrafted Sweets ✦
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }}
                style={{ fontFamily: 'Playfair Display, serif', lineHeight: 1.15, marginBottom: '1.5rem' }}>
                Where Every Bite<br />
                <span className="shimmer-text">Tastes Like Gold</span>
              </motion.h1>

              <motion.p variants={fadeUp} transition={{ duration: 0.6 }}
                style={{ fontSize: '1.05rem', color: '#a89878', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: 460 }}>
                Discover our collection of premium cakes, traditional sweets, and artisan pastries.
                Each creation is crafted with the finest ingredients and a touch of luxury.
              </motion.p>

              <motion.div variants={fadeUp} transition={{ duration: 0.6 }} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/products" className="btn btn-primary btn-lg">
                  Shop Now ✦
                </Link>
                <Link to="/about" className="btn btn-outline btn-lg">
                  Our Story
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} transition={{ duration: 0.6 }}
                style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '3rem',paddingTop: '2rem', borderTop: '1px solid #1e1e1e' }}>
                {[['50+', 'Products'], ['1000+', 'Happy Customers'], ['5★', 'Rating']].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: '#d4a24c', fontWeight: 700 }}>{num}</div>
                    <div style={{ fontSize: '0.78rem', color: '#665c4a', letterSpacing: '0.05em' }}>{label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Image collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hero-images" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
            >
              {[
                { src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', h: 260, mt: 0 },
                { src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400', h: 200, mt: 60 },
                { src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',    h: 200, mt: -40 },
                { src: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400', h: 260, mt: 20 },
              ].map(({ src, h, mt }, i) => (
                <div key={i} style={{
                  marginTop: mt, borderRadius: 16, overflow: 'hidden',
                  border: '1px solid #2a2a2a', boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                }}>
                  <img src={src} alt="Bakery product" style={{ width: '100%', height: h, objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    onError={e => e.currentTarget.src = 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400'}
                  />
                </div>
              ))}

              {/* Gold badge overlay */}
              <div style={{
                position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg,#d4a24c,#b8860b)',
                color: '#0a0a0a', padding: '0.6rem 1.4rem', borderRadius: 100,
                fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.05em',
                whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(212,162,76,0.4)',
              }}>
                ✦ Fresh Baked Daily ✦
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', animation: 'bounce 2s infinite' }}>
          <div style={{ width: 24, height: 40, border: '2px solid #2a2a2a', borderRadius: 12, margin: '0 auto', display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            <div style={{ width: 4, height: 8, background: '#d4a24c', borderRadius: 2, animation: 'scrollDown 1.5s ease infinite' }} />
          </div>
        </div>
        <style>{`
          @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-8px)} }
          @keyframes scrollDown { 0%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(12px)} }
          @media(max-width:768px){ .hero-grid{grid-template-columns:1fr!important} .hero-images{display:none!important} }
        `}</style>
      </section>

      {/* ─── Categories ──────────────────────────────────────── */}
      <section className="section" style={{ background: '#0d0d0d' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.h2 variants={fadeUp} className="section-title gold-text">Shop by Category</motion.h2>
            <div className="gold-divider" />
            <motion.p variants={fadeUp} className="section-subtitle">Explore our wide range of handcrafted treats</motion.p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {[
                { name: 'Cakes',    emoji: '🎂', color: '#d4a24c' },
                { name: 'Sweets',   emoji: '🍬', color: '#b56fd4' },
                { name: 'Pastries', emoji: '🥐', color: '#d4a24c' },
                { name: 'Cookies',  emoji: '🍪', color: '#e0876a' },
                { name: 'Snacks',   emoji: '🍿', color: '#4caf6e' },
                { name: 'Drinks',   emoji: '🥛', color: '#4c9ed4' },
              ].map(({ name, emoji, color }) => (
                <motion.div key={name} variants={fadeUp}>
                  <Link to={`/products?category=${name}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{
                      background: '#161616', border: '1px solid #2a2a2a',
                      borderRadius: 16, padding: '1.75rem 1rem', textAlign: 'center',
                      transition: 'all 0.3s ease', cursor: 'pointer',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = `${color}10`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.background = '#161616'; e.currentTarget.style.transform = 'none'; }}
                    >
                      <div style={{ fontSize: '2.2rem', marginBottom: '0.6rem' }}>{emoji}</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 500, color: '#a89878' }}>{name}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Featured Products ────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.h2 variants={fadeUp} className="section-title">Featured <span className="gold-text">Creations</span></motion.h2>
            <div className="gold-divider" />
            <motion.p variants={fadeUp} className="section-subtitle">Our most-loved, handpicked for you</motion.p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {featured.map(p => <ProductCard key={p._id} product={p} />)}
            </div>

            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link to="/products" className="btn btn-outline btn-lg">View All Products ✦</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Why Choose Us ────────────────────────────────────── */}
      <section className="section" style={{ background: '#0d0d0d' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
            <motion.h2 variants={fadeUp} className="section-title">Why <span className="gold-text">Sweet Venom?</span></motion.h2>
            <div className="gold-divider" />
            <motion.p variants={fadeUp} className="section-subtitle">The gold standard in every bite</motion.p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
              {[
                { icon: '👑', title: 'Premium Quality', desc: 'Only the finest ingredients sourced from trusted suppliers worldwide.' },
                { icon: '🎨', title: 'Artisan Crafted', desc: 'Each item is made with meticulous attention to detail and passion.' },
                { icon: '🚀', title: 'Fresh Daily', desc: 'Baked fresh every morning for maximum taste and quality.' },
                { icon: '🎁', title: 'Custom Orders', desc: 'Special occasions deserve special treats. We customize everything.' },
              ].map(({ icon, title, desc }) => (
                <motion.div key={title} variants={fadeUp} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', color: '#d4a24c', marginBottom: '0.6rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#665c4a', lineHeight: 1.7 }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA Banner ──────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #0f0c07, #1a1200, #0f0c07)',
        border: '1px solid #2a2010', margin: '0 1.5rem', borderRadius: 24,
        padding: '4rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(212,162,76,0.07), transparent 70%)', pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#f0ead6', marginBottom: '1rem' }}>
            Ready to Indulge?
          </h2>
          <p style={{ color: '#a89878', fontSize: '1rem', marginBottom: '2rem', maxWidth: 500, margin: '0 auto 2rem' }}>
            Order now and experience the magic of Sweet Venom delivered to your door.
          </p>
          <Link to="/products" className="btn btn-primary btn-lg pulse-glow">Order Now ✦</Link>
        </motion.div>
      </section>
      <div style={{ height: '5rem' }} />
    </div>
  );
}