// ─── Admin Controller ─────────────────────────────────────────────
const Order   = require('../models/Order');
const User    = require('../models/User');
const Product = require('../models/Product');

// @route  GET /api/admin/orders
// @access Admin
const getAllOrders = async (_req, res) => {
  const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
  res.json({ success: true, count: orders.length, orders });
};

// @route  PUT /api/admin/orders/:id/status
// @access Admin
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
  res.json({ success: true, message: `Order status updated to ${status}`, order });
};

// @route  GET /api/admin/users
// @access Admin
const getAllUsers = async (_req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.json({ success: true, count: users.length, users });
};

// @route  GET /api/admin/stats
// @access Admin
const getDashboardStats = async (_req, res) => {
  const totalOrders   = await Order.countDocuments();
  const totalRevenue  = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalPrice' } } }]);
  const totalProducts = await Product.countDocuments();
  const totalUsers    = await User.countDocuments({ isAdmin: false });
  const recentOrders  = await Order.find().populate('user', 'name').sort({ createdAt: -1 }).limit(5);

  res.json({
    success: true,
    stats: {
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalProducts,
      totalUsers,
    },
    recentOrders,
  });
};

module.exports = { getAllOrders, updateOrderStatus, getAllUsers, getDashboardStats };