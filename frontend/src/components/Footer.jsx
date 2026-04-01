// ─── Footer ──────────────────────────────────────────────────────
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid #1e1e1e', paddingTop: '4rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', paddingBottom: '3rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.6rem', color: '#d4a24c' }}>♛</span>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#f0ead6' }}>
                Sweet <em style={{ background: 'linear-gradient(135deg,#f5d98b,#d4a24c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Venom</em>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#665c4a', marginBottom: '1.25rem' }}>
              Handcrafted sweets, cakes &amp; confections made with premium ingredients and a touch of gold.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[FiInstagram, FiTwitter, FiFacebook].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: 8,
                  border: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#665c4a', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4a24c'; e.currentTarget.style.color = '#d4a24c'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#665c4a'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', color: '#d4a24c', fontSize: '1rem', marginBottom: '1rem' }}>Quick Links</h4>
            {[['/', 'Home'], ['/products', 'Products'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', color: '#665c4a', fontSize: '0.875rem', marginBottom: '0.6rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#d4a24c'}
                onMouseLeave={e => e.currentTarget.style.color = '#665c4a'}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', color: '#d4a24c', fontSize: '1rem', marginBottom: '1rem' }}>Categories</h4>
            {['Cakes', 'Sweets', 'Pastries', 'Cookies', 'Snacks', 'Drinks'].map((cat) => (
              <Link key={cat} to={`/products?category=${cat}`}
                style={{ display: 'block', color: '#665c4a', fontSize: '0.875rem', marginBottom: '0.6rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#d4a24c'}
                onMouseLeave={e => e.currentTarget.style.color = '#665c4a'}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', color: '#d4a24c', fontSize: '1rem', marginBottom: '1rem' }}>Get in Touch</h4>
            {[
              { icon: FiMapPin,  text: '12 Gold Street, Tiruppur, Tamil Nadu 641001' },
              { icon: FiPhone,   text: '+91 98765 43210',   href: 'tel:+919876543210' },
              { icon: FiMail,    text: 'hello@sweetvenom.in', href: 'mailto:hello@sweetvenom.in' },
            ].map(({ icon: Icon, text, href }, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <Icon size={15} style={{ color: '#d4a24c', marginTop: 3, flexShrink: 0 }} />
                {href
                  ? <a href={href} style={{ color: '#665c4a', fontSize: '0.875rem', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#d4a24c'}
                      onMouseLeave={e => e.currentTarget.style.color = '#665c4a'}
                    >{text}</a>
                  : <span style={{ color: '#665c4a', fontSize: '0.875rem', lineHeight: 1.5 }}>{text}</span>
                }
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #1a1a1a', padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.78rem', color: '#3a3228' }}>
            © {new Date().getFullYear()} Sweet Venom Bakery. All rights reserved.
          </p>
          <p style={{ fontSize: '0.78rem', color: '#3a3228' }}>
            Made with <span style={{ color: '#d4a24c' }}>♥</span> in Tiruppur
          </p>
        </div>
      </div>
    </footer>
  );
}