const User = require('../models/User');
const Shop = require('../models/Shop');

async function getDashboardStats(req, res) {
  try {
    const users = await User.findAll();
    const shops = await Shop.findAll();

    res.json({
      success: true,
      data: {
        user: {
          name: req.user.name,
          role: req.user.role,
          email: req.user.email
        },
        shop: shops.length > 0 ? shops[0] : null,
        stats: {
          products: 0,
          customers: 0,
          suppliers: 0,
          sales: 0,
          purchases: 0,
          inventory: 0,
          reports: 0
        }
      }
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to load dashboard stats'
    });
  }
}

module.exports = { getDashboardStats };
