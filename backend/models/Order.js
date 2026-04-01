// ─── Order Model ─────────────────────────────────────────────────
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     { type: String, required: true },
  image:    { type: String, required: true },
  price:    { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    shippingAddress: {
      name:    { type: String, required: true },
      address: { type: String, required: true },
      city:    { type: String, required: true },
      phone:   { type: String, required: true },
    },
    couponCode:    { type: String, default: '' },
    discount:      { type: Number, default: 0 },   // percentage
    subtotal:      { type: Number, required: true },
    totalPrice:    { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    isPaid:     { type: Boolean, default: false },
    isDelivered:{ type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);