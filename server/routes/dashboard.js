const express = require('express');
const authenticate = require('../middleware/auth');
const { getDashboardStats } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/stats', authenticate, getDashboardStats);

module.exports = router;
