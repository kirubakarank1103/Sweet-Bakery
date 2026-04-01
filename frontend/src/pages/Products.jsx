// ─── Products Page ───────────────────────────────────────────────
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const CATEGORIES = ['All', 'Cakes', 'Sweets', 'Pastries', 'Cookies', 'Snacks', 'Drinks'];
const SORTS = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  const [search,   setSearch]   = useState(searchParams.get('search')   || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort,     setSort]     = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search)   params.set('search',   search);
      if (category && category !== 'All') params.set('category', category);
      if (sort)     params.set('sort',     sort);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);

      const { data } = await api.get(`/products?${params}`);
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, category, sort, minPrice, maxPrice]);

  useEffect(() => {
    const t = setTimeout(fetchProducts, 300); // debounce
    return () => clearTimeout(t);
  }, [fetchProducts]);

  const clearFilters = () => {
    setSearch(''); setCategory('All'); setSort('newest'); setMinPrice(''); setMaxPrice('');
  };

  const hasFilters = search || category !== 'All' || minPrice || maxPrice;

  return (
    <div className="page-enter" style={{ paddingTop: 90 }}>
      <div className="container">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <h1 className="section-title">Our <span className="gold-text">Collection</span></h1>
          <div className="gold-divider" />
          <p className="section-subtitle" style={{ marginBottom: 0 }}>Handcrafted with premium ingredients</p>
        </motion.div>

        {/* ── Search + Filter Bar ────────────────────────────── */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
            <FiSearch size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#665c4a', pointerEvents: 'none' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search cakes, sweets..."
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
            />
            {search && (
              <FiX size={16} onClick={() => setSearch('')}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#665c4a', cursor: 'pointer' }} />
            )}
          </div>

          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value)} className="form-select" style={{ width: 'auto', minWidth: 180 }}>
            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>

          {/* Filter toggle */}
          <button className="btn btn-ghost" onClick={() => setShowFilter(p => !p)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderColor: showFilter ? '#d4a24c' : '#2a2a2a', color: showFilter ? '#d4a24c' : '#a89878' }}>
            <FiFilter size={16} /> Filters {hasFilters && <span className="badge badge-gold" style={{ padding: '0.1rem 0.45rem', fontSize: '0.65rem' }}>ON</span>}
          </button>

          {hasFilters && (
            <button className="btn btn-ghost btn-sm" onClick={clearFilters} style={{ color: '#e85555', borderColor: '#e85555' }}>
              <FiX size={14} /> Clear
            </button>
          )}
        </div>

        {/* ── Expandable Filter Panel ────────────────────────── */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                background: '#161616', border: '1px solid #2a2a2a', borderRadius: 16,
                padding: '1.5rem', marginBottom: '1.5rem',
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem',
              }}>
                {/* Category */}
                <div>
                  <p className="form-label">Category</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {CATEGORIES.map(cat => (
                      <button key={cat} onClick={() => setCategory(cat)}
                        style={{
                          padding: '0.3rem 0.8rem', borderRadius: 100, fontSize: '0.8rem', cursor: 'pointer',
                          border: `1px solid ${category === cat ? '#d4a24c' : '#2a2a2a'}`,
                          background: category === cat ? 'rgba(212,162,76,0.15)' : 'transparent',
                          color: category === cat ? '#d4a24c' : '#a89878',
                          transition: 'all 0.2s',
                        }}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div>
                  <p className="form-label">Price Range (₹)</p>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input value={minPrice} onChange={e => setMinPrice(e.target.value)} type="number" placeholder="Min" className="form-input" style={{ flex: 1 }} />
                    <span style={{ color: '#665c4a' }}>–</span>
                    <input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} type="number" placeholder="Max" className="form-input" style={{ flex: 1 }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Category Pills (quick access) ─────────────────── */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '2rem', scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{
                padding: '0.45rem 1.1rem', borderRadius: 100, fontSize: '0.82rem', cursor: 'pointer',
                border: `1px solid ${category === cat ? '#d4a24c' : '#2a2a2a'}`,
                background: category === cat ? 'linear-gradient(135deg,#d4a24c,#b8860b)' : 'transparent',
                color: category === cat ? '#0a0a0a' : '#a89878',
                fontWeight: category === cat ? 600 : 400,
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* ── Results count ─────────────────────────────────── */}
        {!loading && (
          <p style={{ fontSize: '0.82rem', color: '#665c4a', marginBottom: '1.5rem' }}>
            {products.length} {products.length === 1 ? 'product' : 'products'} found
            {category !== 'All' && ` in ${category}`}
          </p>
        )}

        {/* ── Products Grid ─────────────────────────────────── */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ background: '#161616', border: '1px solid #1e1e1e', borderRadius: 20, height: 380, animation: 'shimmerLoad 1.4s ease infinite', animationDelay: `${i * 0.1}s` }} />
            ))}
            <style>{`@keyframes shimmerLoad{0%,100%{opacity:0.5}50%{opacity:1}}`}</style>
          </div>
        ) : products.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ color: '#a89878', marginBottom: '0.5rem' }}>No products found</h3>
            <p style={{ color: '#665c4a' }}>Try adjusting your search or filters</p>
            <button className="btn btn-outline" onClick={clearFilters} style={{ marginTop: '1.5rem' }}>Clear Filters</button>
          </motion.div>
        ) : (
          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}
          >
            <AnimatePresence>
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}