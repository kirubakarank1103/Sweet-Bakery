// ─── Admin Panel ─────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiPackage, FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';

const EMPTY = { name: '', description: '', price: '', image: '', category: 'Cakes', ingredients: '', flavors: '', stock: 100, isFeatured: false };

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [stats,    setStats]    = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [form,     setForm]     = useState(EMPTY);
  const [saving,   setSaving]   = useState(false);

  const load = async () => {
    const [p, s] = await Promise.all([api.get('/products'), api.get('/admin/stats')]);
    setProducts(p.data.products);
    setStats(s.data.stats);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (p)  => {
    setEditing(p._id);
    setForm({ ...p, ingredients: p.ingredients.join(', '), flavors: p.flavors.join(', '), price: String(p.price), stock: String(p.stock) });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      price:       Number(form.price),
      stock:       Number(form.stock),
      ingredients: form.ingredients.split(',').map(s => s.trim()).filter(Boolean),
      flavors:     form.flavors.split(',').map(s => s.trim()).filter(Boolean),
    };
    try {
      if (editing) {
        await api.put(`/products/${editing}`, payload);
        toast.success('Product updated!');
      } else {
        await api.post('/products', payload);
        toast.success('Product created! 🎂');
      }
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed.');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted.');
      load();
    } catch { toast.error('Delete failed.'); }
  };

  return (
    <div className="page-enter" style={{ paddingTop: 90, paddingBottom: '4rem', background: '#0a0a0a', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: '2rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif' }}>Admin <span className="gold-text">Panel</span></h1>
            <p style={{ color: '#665c4a', fontSize: '0.875rem' }}>Manage products and view stats</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/admin/orders" className="btn btn-ghost"><FiShoppingBag size={16}/> Orders</Link>
            <button className="btn btn-primary" onClick={openAdd}><FiPlus size={16}/> Add Product</button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
            {[
              { icon: FiPackage,    label: 'Products', value: stats.totalProducts, color: '#d4a24c' },
              { icon: FiShoppingBag,label: 'Orders',   value: stats.totalOrders,   color: '#b56fd4' },
              { icon: FiUsers,      label: 'Customers',value: stats.totalUsers,    color: '#4c9ed4' },
              { icon: FiDollarSign, label: 'Revenue',  value: formatPrice(stats.totalRevenue), color: '#4caf6e' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 14, padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#665c4a' }}>{label}</p>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: color, fontWeight: 700 }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products Table */}
        {loading ? <div className="spinner" /> : (
          <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                    {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '0.9rem 1rem', textAlign: 'left', fontSize: '0.75rem', color: '#665c4a', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <motion.tr key={p._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                      style={{ borderBottom: '1px solid #1a1a1a', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '0.8rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={p.image} alt={p.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                            onError={e => e.currentTarget.src='https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=80'}/>
                          <div>
                            <p style={{ fontSize: '0.875rem', color: '#f0ead6', fontWeight: 500 }}>{p.name}</p>
                            {p.isFeatured && <span style={{ fontSize: '0.65rem', color: '#d4a24c' }}>✦ Featured</span>}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.8rem 1rem' }}><span className="badge badge-gold">{p.category}</span></td>
                      <td style={{ padding: '0.8rem 1rem', color: '#d4a24c', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>{formatPrice(p.price)}</td>
                      <td style={{ padding: '0.8rem 1rem', color: p.stock < 10 ? '#e85555' : '#a89878', fontSize: '0.875rem' }}>{p.stock}</td>
                      <td style={{ padding: '0.8rem 1rem', color: '#d4a24c', fontSize: '0.875rem' }}>⭐ {p.rating.toFixed(1)}</td>
                      <td style={{ padding: '0.8rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button onClick={() => openEdit(p)} className="btn btn-ghost btn-sm" style={{ padding: '0.35rem 0.6rem' }}><FiEdit2 size={13}/></button>
                          <button onClick={() => handleDelete(p._id, p.name)} className="btn btn-danger btn-sm" style={{ padding: '0.35rem 0.6rem' }}><FiTrash2 size={13}/></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Product Form Modal ──────────────────────────────── */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}
              onClick={e => e.target === e.currentTarget && setShowForm(false)}
            >
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
                style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 20, padding: '2rem', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#f0ead6', marginBottom: '1.5rem' }}>
                  {editing ? 'Edit Product' : 'Add New Product'}
                </h2>
                <form onSubmit={handleSave}>
                  {[
                    ['name',        'Product Name',     'text',   'Black Forest Cake'],
                    ['price',       'Price (₹)',        'number', '850'],
                    ['image',       'Image URL',        'url',    'https://...'],
                    ['stock',       'Stock Quantity',   'number', '20'],
                  ].map(([key, label, type, ph]) => (
                    <div key={key} className="form-group">
                      <label className="form-label">{label}</label>
                      <input type={type} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        className="form-input" placeholder={ph} required />
                    </div>
                  ))}
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="form-select">
                      {['Cakes','Sweets','Pastries','Cookies','Snacks','Drinks'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="form-textarea" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Ingredients (comma-separated)</label>
                    <input value={form.ingredients} onChange={e => setForm(p => ({ ...p, ingredients: e.target.value }))} className="form-input" placeholder="Flour, Sugar, Butter" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Flavors (comma-separated)</label>
                    <input value={form.flavors} onChange={e => setForm(p => ({ ...p, flavors: e.target.value }))} className="form-input" placeholder="Chocolate, Vanilla" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                    <input type="checkbox" id="feat" checked={form.isFeatured} onChange={e => setForm(p => ({ ...p, isFeatured: e.target.checked }))}
                      style={{ width: 16, height: 16, accentColor: '#d4a24c', cursor: 'pointer' }} />
                    <label htmlFor="feat" style={{ fontSize: '0.875rem', color: '#a89878', cursor: 'pointer' }}>Mark as Featured</label>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={saving}>
                      {saving ? 'Saving...' : editing ? 'Update Product' : 'Create Product'}
                    </button>
                    <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}