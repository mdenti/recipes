const express = require('express');

function getIndexRouter() {
  const router = express.Router();

  /* GET home page. */
  router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
  });

  return router;
}

module.exports = getIndexRouter;
