// ─── Order Controller ─────────────────────────────────────────────
const Order = require('../models/Order');

// @route  POST /api/orders
// @access Private
const createOrder = async (req, res) => {
  const { items, shippingAddress, couponCode, discount, subtotal, totalPrice } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'No order items provided.' });
  }

  const order = await Order.create({
    user: req.user._id,
    items,
    shippingAddress,
    couponCode: couponCode || '',
    discount:   discount   || 0,
    subtotal,
    totalPrice,
  });

  res.status(201).json({
    success: true,
    message: 'Order placed successfully! 🎉 We will process it soon.',
    order,
  });
};

// @route  GET /api/orders/my-orders
// @access Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, count: orders.length, orders });
};

// @route  GET /api/orders/:id
// @access Private
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
  // Only owner or admin can view
  if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    return res.status(403).json({ success: false, message: 'Not authorized.' });
  }
  res.json({ success: true, order });
};

module.exports = { createOrder, getMyOrders, getOrderById };