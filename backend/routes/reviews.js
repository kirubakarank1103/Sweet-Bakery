// ─── Reviews Routes ───────────────────────────────────────────────
const express  = require('express');
const router   = express.Router();
const Product  = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

// @route  POST /api/reviews/:productId
// @access Private
router.post('/:productId', protect, async (req, res) => {
  const { rating, comment } = req.body;
  if (!rating || !comment) {
    return res.status(400).json({ success: false, message: 'Rating and comment are required.' });
  }

  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

  // Check if user already reviewed
  const already = product.reviews.find(r => r.user.toString() === req.user._id.toString());
  if (already) {
    return res.status(400).json({ success: false, message: 'You have already reviewed this product.' });
  }

  product.reviews.push({ user: req.user._id, name: req.user.name, rating: Number(rating), comment });
  product.numReviews = product.reviews.length;
  product.rating     = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
  await product.save();

  res.status(201).json({ success: true, message: 'Review added! ⭐', reviews: product.reviews });
});

// @route  GET /api/reviews/:productId
// @access Public
router.get('/:productId', async (req, res) => {
  const product = await Product.findById(req.params.productId).populate('reviews.user', 'name');
  if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
  res.json({ success: true, reviews: product.reviews, rating: product.rating, numReviews: product.numReviews });
});

module.exports = router;