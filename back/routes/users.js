const express = require('express');

export default function getUsersRouter() {
  const router = express.Router();

  /* GET users listing. */
  router.get('/', (req, res) => {
    res.send('respond with a resource');
  });

  return router;
}
