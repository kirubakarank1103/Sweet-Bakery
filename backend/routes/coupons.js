// ─── Coupons Routes ───────────────────────────────────────────────
const express  = require('express');
const router   = express.Router();
const Coupon   = require('../models/Coupon');
const { protect }   = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// @route  POST /api/coupons/validate
// @access Private
router.post('/validate', protect, async (req, res) => {
  const { code, orderTotal } = req.body;
  if (!code) return res.status(400).json({ success: false, message: 'Coupon code is required.' });

  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
  if (!coupon)                         return res.status(404).json({ success: false, message: 'Invalid coupon code.' });
  if (new Date() > coupon.expiryDate)  return res.status(400).json({ success: false, message: 'This coupon has expired.' });
  if (coupon.usedCount >= coupon.maxUses) return res.status(400).json({ success: false, message: 'Coupon usage limit reached.' });
  if (orderTotal < coupon.minOrder)    return res.status(400).json({ success: false, message: `Minimum order ₹${coupon.minOrder} required.` });

  res.json({
    success: true,
    message: `Coupon applied! You save ${coupon.discount}% 🎉`,
    discount: coupon.discount,
    code: coupon.code,
  });
});

// @route  POST /api/coupons  (Admin: create coupon)
router.post('/', protect, adminOnly, async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json({ success: true, message: 'Coupon created!', coupon });
});

// @route  GET /api/coupons  (Admin: list all)
router.get('/', protect, adminOnly, async (_req, res) => {
  const coupons = await Coupon.find({}).sort({ createdAt: -1 });
  res.json({ success: true, coupons });
});

// @route  DELETE /api/coupons/:id  (Admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Coupon deleted.' });
});

module.exports = router;