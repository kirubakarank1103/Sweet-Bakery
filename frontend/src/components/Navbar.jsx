// ─── Navbar ──────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [dropOpen,    setDropOpen]    = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/',          label: 'Home'     },
    { to: '/products',  label: 'Products' },
    { to: '/about',     label: 'About'    },
    { to: '/contact',   label: 'Contact'  },
  ];

  const handleLogout = () => { logout(); navigate('/'); setDropOpen(false); };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(10,10,10,0.97)' : 'transparent',
      borderBottom: scrolled ? '1px solid #2a2a2a' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.3s ease',
      padding: '0 1.5rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.4rem', filter: 'drop-shadow(0 0 8px rgba(212,162,76,0.5))' }}>♛</span>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#f0ead6' }}>
            Sweet <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#f5d98b,#d4a24c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Venom</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to} to={to}
              style={({ isActive }) => ({
                padding: '0.5rem 1rem',
                borderRadius: 8,
                fontSize: '0.9rem',
                color: isActive ? '#d4a24c' : '#a89878',
                background: isActive ? 'rgba(212,162,76,0.08)' : 'transparent',
                transition: 'all 0.2s',
                textDecoration: 'none',
                fontWeight: isActive ? '500' : '400',
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right: Cart + User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Cart button */}
          <Link to="/cart" style={{ position: 'relative', padding: '0.5rem', borderRadius: 8, color: '#a89878', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#d4a24c'}
            onMouseLeave={e => e.currentTarget.style.color = '#a89878'}
          >
            <FiShoppingCart size={22} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: 0, right: 0,
                background: 'linear-gradient(135deg,#d4a24c,#b8860b)',
                color: '#0a0a0a', borderRadius: '50%',
                width: 18, height: 18, fontSize: '0.65rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>

          {/* User dropdown or login */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setDropOpen(p => !p)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  background: 'rgba(212,162,76,0.1)', border: '1px solid rgba(212,162,76,0.3)',
                  borderRadius: 8, padding: '0.45rem 0.85rem', cursor: 'pointer',
                  color: '#d4a24c', fontSize: '0.85rem', transition: 'all 0.2s',
                }}
              >
                <FiUser size={16} />
                <span style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name.split(' ')[0]}
                </span>
              </button>

              {dropOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: '110%',
                  background: '#161616', border: '1px solid #2a2a2a',
                  borderRadius: 12, overflow: 'hidden', minWidth: 180,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.6)', zIndex: 100,
                }}>
                  {isAdmin && (
                    <>
                      <DropItem to="/admin" icon={<FiSettings size={14}/>} label="Admin Panel" onClick={() => setDropOpen(false)} />
                      <DropItem to="/admin/orders" icon={<FiSettings size={14}/>} label="View Orders" onClick={() => setDropOpen(false)} />
                      <div style={{ height: 1, background: '#2a2a2a', margin: '0.25rem 0' }} />
                    </>
                  )}
                  <DropItem to="/orders" icon={<FiUser size={14}/>} label="My Orders" onClick={() => setDropOpen(false)} />
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      width: '100%', padding: '0.65rem 1rem', background: 'none',
                      border: 'none', cursor: 'pointer', color: '#e85555',
                      fontSize: '0.85rem', textAlign: 'left', transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,85,85,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <FiLogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(p => !p)}
            style={{ background: 'none', border: 'none', color: '#a89878', cursor: 'pointer', padding: '0.4rem', display: 'none' }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{ background: '#111', borderTop: '1px solid #2a2a2a', padding: '1rem 1.5rem 1.5rem' }}>
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '0.75rem 0', color: '#a89878', borderBottom: '1px solid #1e1e1e', fontSize: '0.95rem' }}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

function DropItem({ to, icon, label, onClick }) {
  return (
    <Link to={to} onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1rem', color: '#a89878', fontSize: '0.85rem', transition: 'all 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,162,76,0.08)'; e.currentTarget.style.color = '#d4a24c'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#a89878'; }}
    >
      {icon} {label}
    </Link>
  );
}