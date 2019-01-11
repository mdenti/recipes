const express = require('express');

export default function getIndexRouter() {
  const router = express.Router();

  /* GET home page. */
  router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
  });

  return router;
}
