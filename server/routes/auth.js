const express = require('express');
const { body } = require('express-validator');
const { login, logout, me } = require('../controllers/authController');
const { validate, loginValidation } = require('../utils/validation');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/login', validate(loginValidation), login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, me);

module.exports = router;
