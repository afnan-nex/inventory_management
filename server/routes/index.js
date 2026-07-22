const express = require('express');

function createRouter() {
  const router = express.Router();

  router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  return router;
}

module.exports = createRouter;
