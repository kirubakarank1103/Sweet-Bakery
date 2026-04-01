// ─── Coupon Model ────────────────────────────────────────────────
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code:       { type: String, required: true, unique: true, uppercase: true, trim: true },
    discount:   { type: Number, required: true, min: 1, max: 100 },  // percentage
    minOrder:   { type: Number, default: 0 },
    isActive:   { type: Boolean, default: true },
    expiryDate: { type: Date, required: true },
    usedCount:  { type: Number, default: 0 },
    maxUses:    { type: Number, default: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);