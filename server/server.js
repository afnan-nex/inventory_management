const createApp = require('./app');

const app = createApp();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Inventory Management System running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server shut down gracefully');
    process.exit(0);
  });
});

module.exports = app;
