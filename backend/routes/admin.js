// ─── Admin Routes ─────────────────────────────────────────────────
const express = require('express');
const router  = express.Router();
const { getAllOrders, updateOrderStatus, getAllUsers, getDashboardStats } = require('../controllers/adminController');
const { protect }   = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// All admin routes require login + isAdmin
router.use(protect, adminOnly);

router.get('/stats',              getDashboardStats);
router.get('/orders',             getAllOrders);
router.put('/orders/:id/status',  updateOrderStatus);
router.get('/users',              getAllUsers);

module.exports = router;