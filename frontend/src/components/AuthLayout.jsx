// ─── AuthLayout ──────────────────────────────────────────────────
export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '2rem',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #0f0c07 50%, #0a0a0a 100%)',
    }}>
      {/* Gold orb */}
      <div style={{
        position: 'fixed', width: 400, height: 400, top: '-10%', right: '-10%',
        background: 'radial-gradient(circle, #d4a24c, transparent 70%)',
        opacity: 0.05, borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: 420,
        background: '#161616', border: '1px solid #2a2a2a',
        borderRadius: 20, padding: '2.5rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>♛</div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.6rem', color: '#f0ead6', marginBottom: '0.3rem'
          }}>{title}</h1>
          <p style={{ fontSize: '0.85rem', color: '#665c4a' }}>{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}