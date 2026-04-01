// ─── Seed File — Run: node seed.js ───────────────────────────────
// Populates the DB with sample products, an admin user, and coupons
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const dotenv   = require('dotenv');
dotenv.config();

const User    = require('./models/User');
const Product = require('./models/Product');
const Coupon  = require('./models/Coupon');

const products = [
  {
    name: 'Royal Black Forest Cake',
    description: 'Layers of moist chocolate sponge, whipped cream, and cherries. A timeless classic with a luxurious twist.',
    price: 850,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
    category: 'Cakes',
    ingredients: ['Chocolate sponge', 'Whipped cream', 'Cherries', 'Dark chocolate shavings'],
    flavors: ['Chocolate', 'Cherry', 'Vanilla cream'],
    stock: 20,
    isFeatured: true,
    rating: 4.8,
    numReviews: 24,
  },
  {
    name: 'Gold Velvet Cake',
    description: 'Premium red velvet reinvented with golden cream cheese frosting and edible gold dust. Pure luxury.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600',
    category: 'Cakes',
    ingredients: ['Red velvet sponge', 'Cream cheese', 'Edible gold dust', 'Butter'],
    flavors: ['Red velvet', 'Cream cheese', 'Vanilla'],
    stock: 15,
    isFeatured: true,
    rating: 4.9,
    numReviews: 31,
  },
  {
    name: 'Midnight Truffle Cake',
    description: 'Dense, fudgy dark chocolate cake smothered in silky ganache. For serious chocolate lovers only.',
    price: 950,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600',
    category: 'Cakes',
    ingredients: ['Dark chocolate', 'Ganache', 'Cocoa powder', 'Espresso'],
    flavors: ['Dark chocolate', 'Espresso', 'Ganache'],
    stock: 18,
    isFeatured: true,
    rating: 4.7,
    numReviews: 19,
  },
  {
    name: 'Kaju Katli (Premium)',
    description: 'Traditional cashew diamond sweets made with pure desi ghee. Melt-in-mouth perfection.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600',
    category: 'Sweets',
    ingredients: ['Cashews', 'Sugar', 'Desi ghee', 'Cardamom'],
    flavors: ['Cashew', 'Cardamom'],
    stock: 50,
    isFeatured: true,
    rating: 4.6,
    numReviews: 42,
  },
  {
    name: 'Gulab Jamun Box',
    description: 'Soft, spongy milk-solid dumplings soaked in rose-cardamom sugar syrup. Classic Indian dessert.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1666711007729-8c7e77fa8f46?w=600',
    category: 'Sweets',
    ingredients: ['Khoya', 'Maida', 'Rose water', 'Cardamom', 'Sugar syrup'],
    flavors: ['Rose', 'Cardamom'],
    stock: 40,
    isFeatured: false,
    rating: 4.5,
    numReviews: 28,
  },
  {
    name: 'Baklava Assortment',
    description: 'Layers of phyllo pastry filled with pistachios and walnuts, soaked in honey syrup. 12 pieces.',
    price: 620,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600',
    category: 'Sweets',
    ingredients: ['Phyllo pastry', 'Pistachios', 'Walnuts', 'Honey', 'Butter'],
    flavors: ['Pistachio', 'Walnut', 'Honey'],
    stock: 30,
    isFeatured: true,
    rating: 4.8,
    numReviews: 17,
  },
  {
    name: 'Salted Caramel Croissant',
    description: 'Buttery, flaky croissant with a salted caramel filling. Baked fresh every morning.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600',
    category: 'Pastries',
    ingredients: ['Butter', 'Flour', 'Caramel', 'Sea salt', 'Eggs'],
    flavors: ['Caramel', 'Butter', 'Sea salt'],
    stock: 25,
    isFeatured: false,
    rating: 4.7,
    numReviews: 33,
  },
  {
    name: 'Dark Chocolate Brownie',
    description: 'Fudgy, dense brownies with a crinkly top crust. Made with 70% Belgian dark chocolate.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=600',
    category: 'Snacks',
    ingredients: ['Belgian dark chocolate', 'Butter', 'Sugar', 'Eggs', 'Walnuts'],
    flavors: ['Dark chocolate', 'Walnut'],
    stock: 35,
    isFeatured: false,
    rating: 4.9,
    numReviews: 56,
  },
  {
    name: 'Almond Biscotti',
    description: 'Twice-baked Italian cookies studded with whole almonds. Perfect with tea or coffee.',
    price: 160,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600',
    category: 'Cookies',
    ingredients: ['Almonds', 'Flour', 'Sugar', 'Eggs', 'Vanilla'],
    flavors: ['Almond', 'Vanilla'],
    stock: 40,
    isFeatured: false,
    rating: 4.4,
    numReviews: 21,
  },
  {
    name: 'Rose Lassi',
    description: 'Chilled rose-flavored yogurt drink topped with dried rose petals. Refreshingly indulgent.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=600',
    category: 'Drinks',
    ingredients: ['Yogurt', 'Rose syrup', 'Sugar', 'Rose water', 'Dried rose petals'],
    flavors: ['Rose', 'Yogurt'],
    stock: 30,
    isFeatured: false,
    rating: 4.3,
    numReviews: 14,
  },
];

const coupons = [
  { code: 'SWEET10',  discount: 10, minOrder: 500,  expiryDate: new Date('2026-12-31'), maxUses: 200 },
  { code: 'VENOM20',  discount: 20, minOrder: 1000, expiryDate: new Date('2026-12-31'), maxUses: 100 },
  { code: 'FIRST50',  discount: 50, minOrder: 300,  expiryDate: new Date('2026-12-31'), maxUses: 50  },
];

async function seedDB() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sweet-venom-bakery');
  console.log('✅ Connected to MongoDB');

  // Clear existing
  await Product.deleteMany({});
  await Coupon.deleteMany({});
  console.log('🗑️  Cleared products & coupons');

  // Create admin if not exists
  const adminExists = await User.findOne({ email: 'admin@sweetvenom.com' });
  if (!adminExists) {
    await User.create({
      name: 'Admin',
      email: 'admin@sweetvenom.com',
      password: 'Admin@123',
      isAdmin: true,
    });
    console.log('👤 Admin created → admin@sweetvenom.com / Admin@123');
  }

  await Product.insertMany(products);
  console.log(`🎂 ${products.length} products seeded`);

  await Coupon.insertMany(coupons);
  console.log(`🎟️  ${coupons.length} coupons seeded → SWEET10, VENOM20, FIRST50`);

  console.log('\n✅ Seed complete! Run: npm run dev');
  process.exit(0);
}

seedDB().catch((err) => { console.error(err); process.exit(1); });
