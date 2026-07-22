const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

const { errorHandler, notFound } = require('./middleware/error');
const { loginLimiter, apiLimiter } = require('./middleware/rateLimit');

dotenv.config();

function createApp() {
  const app = express();

  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  }));

  app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? false : true,
    credentials: true
  }));

  app.use(morgan('dev'));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));

  app.use(session({
    secret: process.env.SESSION_SECRET || 'inventory_management_super_secret_session_key_change_in_production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict'
    }
  }));

  app.use('/api/auth', loginLimiter, require('./routes/auth'));
  app.use('/api/dashboard', apiLimiter, require('./routes/dashboard'));
  app.use(require('./routes/index'));

  app.use('*', notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
