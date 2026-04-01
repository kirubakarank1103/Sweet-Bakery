// ─── Coupon Input ─────────────────────────────────────────────────
import { useState } from 'react';
import api from '../utils/api';
import { FiTag } from 'react-icons/fi';

export default function CouponInput({ orderTotal, onApply }) {
  const [code,    setCode]    = useState('');
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(null);
  const [error,   setError]   = useState('');

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/coupons/validate', { code: code.trim(), orderTotal });
      setApplied(data);
      onApply(data.discount, data.code);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid coupon.');
      setApplied(null);
      onApply(0, '');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setApplied(null); setCode(''); setError('');
    onApply(0, '');
  };

  return (
    <div>
      {applied ? (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(76,175,110,0.1)', border: '1px solid rgba(76,175,110,0.3)',
          borderRadius: 10, padding: '0.75rem 1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiTag size={14} style={{ color: '#4caf6e' }} />
            <span style={{ color: '#4caf6e', fontSize: '0.9rem', fontWeight: 500 }}>
              {applied.code} — {applied.discount}% off applied!
            </span>
          </div>
          <button onClick={handleRemove} style={{
            background: 'none', border: 'none', color: '#e85555',
            cursor: 'pointer', fontSize: '0.8rem',
          }}>Remove</button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              value={code}
              onChange={e => { setCode(e.target.value.toUpperCase()); setError(''); }}
              placeholder="Enter coupon code"
              className="form-input"
              style={{ flex: 1 }}
              onKeyDown={e => e.key === 'Enter' && handleApply()}
            />
            <button className="btn btn-outline btn-sm" onClick={handleApply} disabled={loading || !code.trim()}>
              {loading ? '...' : 'Apply'}
            </button>
          </div>
          {error && <p style={{ color: '#e85555', fontSize: '0.8rem', marginTop: '0.4rem' }}>{error}</p>}
          <p style={{ fontSize: '0.75rem', color: '#665c4a', marginTop: '0.4rem' }}>
            Try: SWEET10, VENOM20, FIRST50
          </p>
        </>
      )}
    </div>
  );
}