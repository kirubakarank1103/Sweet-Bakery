// ─── Login Page ──────────────────────────────────────────────────
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) navigate(res.isAdmin ? '/admin' : '/');
  };

  return <AuthLayout title="Welcome Back" subtitle="Sign in to your Sweet Venom account">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-input" placeholder="you@email.com" required />
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-input" placeholder="••••••••" required />
      </div>
      <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In ✦'}
      </button>
    </form>
    <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#665c4a' }}>
      Don't have an account? <Link to="/register" style={{ color: '#d4a24c' }}>Register</Link>
    </p>
    <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.75rem', color: '#3a3228' }}>
      Admin demo: admin@sweetvenom.com / Admin@123
    </p>
  </AuthLayout>;
}