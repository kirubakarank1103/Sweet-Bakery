// ─── Register Page ───────────────────────────────────────────────
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [err, setErr] = useState('');

  const handleInput = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setErr('Passwords do not match.');
    if (form.password.length < 6)       return setErr('Password must be at least 6 characters.');
    setErr('');
    const res = await register(form.name, form.email, form.password, form.phone);
    if (res.success) navigate('/');
  };

  return <AuthLayout title="Create Account" subtitle="Join Sweet Venom and enjoy premium treats">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input name="name" value={form.name} onChange={handleInput} className="form-input" placeholder="Your name" required />
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input name="email" value={form.email} onChange={handleInput} type="email" className="form-input" placeholder="you@email.com" required />
      </div>
      <div className="form-group">
        <label className="form-label">Phone (optional)</label>
        <input name="phone" value={form.phone} onChange={handleInput} className="form-input" placeholder="+91 98765 43210" />
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input name="password" value={form.password} onChange={handleInput} type="password" className="form-input" placeholder="Min 6 characters" required />
      </div>
      <div className="form-group">
        <label className="form-label">Confirm Password</label>
        <input name="confirm" value={form.confirm} onChange={handleInput} type="password" className="form-input" placeholder="Repeat password" required />
      </div>
      {err && <p style={{ color: '#e85555', fontSize: '0.82rem', marginBottom: '0.75rem' }}>{err}</p>}
      <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Account ✦'}
      </button>
    </form>
    <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#665c4a' }}>
      Already have an account? <Link to="/login" style={{ color: '#d4a24c' }}>Sign In</Link>
    </p>
  </AuthLayout>;
}

// ─── Shared Auth Layout ──────────────────────────────────────────
export function AuthLayout({ title, subtitle, children }) {
  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Gold orb */}
      <div style={{ position: 'absolute', width: 400, height: 400, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(212,162,76,0.05), transparent 70%)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link to="/" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
            <span style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 12px rgba(212,162,76,0.5))' }}>♛</span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#f0ead6' }}>
              Sweet <em style={{ background: 'linear-gradient(135deg,#f5d98b,#d4a24c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Venom</em>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 20, padding: '2.5rem' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: '#f0ead6', marginBottom: '0.4rem', textAlign: 'center' }}>{title}</h1>
          <p style={{ color: '#665c4a', fontSize: '0.875rem', textAlign: 'center', marginBottom: '2rem' }}>{subtitle}</p>
          {children}
        </div>
      </motion.div>
    </div>
  );
}