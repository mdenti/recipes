const express = require('express');

function getUsersRouter() {
  const router = express.Router();

  /* GET users listing. */
  router.get('/', (req, res) => {
    res.send('respond with a resource');
  });

  return router;
}

module.exports = getUsersRouter;
