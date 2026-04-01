// ─── Product Controller ──────────────────────────────────────────
const Product = require('../models/Product');

// @route  GET /api/products
// @access Public  — supports ?search=&category=&minPrice=&maxPrice=&sort=
const getProducts = async (req, res) => {
  const { search, category, minPrice, maxPrice, sort, featured } = req.query;
  const filter = {};

  if (search)   filter.name = { $regex: search, $options: 'i' };
  if (category && category !== 'All') filter.category = category;
  if (featured) filter.isFeatured = true;

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const sortMap = {
    'price-asc':  { price: 1 },
    'price-desc': { price: -1 },
    'rating':     { rating: -1 },
    'newest':     { createdAt: -1 },
  };
  const sortObj = sortMap[sort] || { createdAt: -1 };

  const products = await Product.find(filter).sort(sortObj);
  res.json({ success: true, count: products.length, products });
};

// @route  GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
  if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
  res.json({ success: true, product });
};

// @route  POST /api/products
// @access Admin
const createProduct = async (req, res) => {
  const { name, description, price, image, category, ingredients, flavors, stock, isFeatured } = req.body;
  if (!name || !description || !price || !image || !category) {
    return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
  }
  const product = await Product.create({ name, description, price, image, category, ingredients, flavors, stock, isFeatured });
  res.status(201).json({ success: true, message: 'Product created! 🎂', product });
};

// @route  PUT /api/products/:id
// @access Admin
const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
  res.json({ success: true, message: 'Product updated!', product });
};

// @route  DELETE /api/products/:id
// @access Admin
const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
  res.json({ success: true, message: 'Product deleted successfully.' });
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };