// ─── User Controller ─────────────────────────────────────────────
const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// Helper to generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// @route  POST /api/users/register
// @access Public
const register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ success: false, message: 'Email already registered.' });
  }

  const user = await User.create({ name, email, password, phone });
  res.status(201).json({
    success: true,
    message: 'Account created successfully! 🎉',
    user,
    token: generateToken(user._id),
  });
};

// @route  POST /api/users/login
// @access Public
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  res.json({
    success: true,
    message: `Welcome back, ${user.name}! 🍰`,
    user,
    token: generateToken(user._id),
  });
};

// @route  GET /api/users/profile
// @access Private
const getProfile = async (req, res) => {
  res.json({ success: true, user: req.user });
};

// @route  PUT /api/users/profile
// @access Private
const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

  user.name    = req.body.name    || user.name;
  user.phone   = req.body.phone   || user.phone;
  user.address = req.body.address || user.address;
  if (req.body.password) user.password = req.body.password;

  const updated = await user.save();
  res.json({ success: true, message: 'Profile updated!', user: updated });
};

module.exports = { register, login, getProfile, updateProfile };