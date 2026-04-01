// ─── About Page ──────────────────────────────────────────────────
import { motion } from 'framer-motion';
export default function About() {
  const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
  return (
    <div className="page-enter" style={{ paddingTop: 70 }}>
      {/* Hero */}
      <section style={{ padding: '6rem 0 4rem', textAlign: 'center', background: 'linear-gradient(180deg,#0f0c07,#0a0a0a)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(212,162,76,0.06), transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.15 } } }}>
            <motion.span variants={fadeUp} style={{ display: 'inline-block', background: 'rgba(212,162,76,0.1)', border: '1px solid rgba(212,162,76,0.3)', color: '#d4a24c', padding: '0.3rem 1rem', borderRadius: 100, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              ✦ Our Story ✦
            </motion.span>
            <motion.h1 variants={fadeUp} style={{ fontFamily: 'Playfair Display, serif' }}>Crafted with <span className="gold-text">Passion</span></motion.h1>
            <motion.p variants={fadeUp} style={{ maxWidth: 560, margin: '1.25rem auto 0', color: '#a89878', lineHeight: 1.8 }}>
              Born in the heart of Tiruppur, Sweet Venom Bakery was founded with a simple belief — that every sweet moment in life deserves the finest, most lovingly crafted treats.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400','https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
                  'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400','https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400'].map((src, i) => (
                  <div key={i} style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #2a2a2a', transform: i % 2 === 1 ? 'translateY(20px)' : 'none' }}>
                    <img src={src} alt="" style={{ width: '100%', height: 160, objectFit: 'cover' }} onError={e => e.currentTarget.src='https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400'} />
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.25rem' }}>A Golden <span className="gold-text">Legacy</span></h2>
              <p style={{ color: '#a89878', lineHeight: 1.9, marginBottom: '1rem' }}>
                What started as a small kitchen experiment in 2018 has grown into Tiruppur's most beloved premium bakery. Our founder, inspired by generations of family recipes and a love for luxury patisserie, set out to create an experience unlike any other.
              </p>
              <p style={{ color: '#a89878', lineHeight: 1.9 }}>
                Today, every product that leaves our kitchen carries the same devotion — sourced from the finest ingredients, crafted by skilled artisans, and delivered with golden care.
              </p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                {[['6+', 'Years'], ['50+', 'Products'], ['1000+', 'Customers']].map(([n, l]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#d4a24c', fontWeight: 700 }}>{n}</div>
                    <div style={{ fontSize: '0.75rem', color: '#665c4a' }}>{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: '#0d0d0d' }}>
        <div className="container">
          <h2 className="section-title">Why <span className="gold-text">Choose Us?</span></h2>
          <div className="gold-divider" />
          <p className="section-subtitle">We don't just bake — we create experiences</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🏆', t: 'Award-Winning Quality', d: 'Recognized for excellence in artisan baking by regional food associations.' },
              { icon: '🌿', t: '100% Natural', d: 'No artificial colours, preservatives, or shortcuts. Just pure, natural goodness.' },
              { icon: '🎂', t: 'Custom Creations', d: 'From wedding cakes to birthday surprises — we bring your vision to life.' },
              { icon: '🚚', t: 'Same-Day Delivery', d: 'Order before 2 PM and receive your treats fresh at your doorstep.' },
              { icon: '💛', t: 'Made with Love', d: 'Every item is personally crafted with attention to detail and passion.' },
              { icon: '🔒', t: 'Hygienic Facility', d: 'FSSAI certified kitchen with highest standards of cleanliness.' },
            ].map(({ icon, t, d }) => (
              <motion.div key={t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="card" style={{ padding: '1.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', color: '#d4a24c', marginBottom: '0.5rem' }}>{t}</h3>
                <p style={{ fontSize: '0.82rem', color: '#665c4a', lineHeight: 1.7 }}>{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}