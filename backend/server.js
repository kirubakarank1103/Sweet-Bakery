// ============================================================
// 🍰 Sweet Venom Bakery — Main Server Entry Point
// ============================================================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:5173',
    process.env.FRONTEND_URL || 'https://sweet-bakery-cwq6.onrender.com'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────
app.use('/api/products', require('./routes/products'));
app.use('/api/users',    require('./routes/users'));
app.use('/api/orders',   require('./routes/orders'));
app.use('/api/reviews',  require('./routes/reviews'));
app.use('/api/coupons',  require('./routes/coupons'));
app.use('/api/admin',    require('./routes/admin'));

// ─── Health Check ─────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({ success: true, message: '🍰 Sweet Venom Bakery API is running!' });
});

// ─── 404 Handler ──────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use(require('./middleware/errorHandler'));

// ─── Connect DB & Start Server ────────────────────────────────
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sweet-venom-bakery')
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
