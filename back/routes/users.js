const express = require('express');

const users = require('../users');

function getUsersRouter(ctx, passport) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    try {
      const userId = await users.createNewUser(ctx, req.body);
      res.send({ userId });
    } catch (error) {
      res.status(500).send({ error: 'could not create new user' });
      throw error;
    }
  });

  router.post('/login',
    passport.authenticate('local'),
    (req, res) => {
      res.send();
    });

  router.get('/authenticate',
    passport.authenticate('local'),
    (req, res) => {
      res.send();
    });

  return router;
}

module.exports = getUsersRouter;
