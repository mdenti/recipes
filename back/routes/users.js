const express = require('express');

const users = require('../users');
const { requireUserLogin } = require('../passport');

function getUsersRouter(ctx, passport) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    try {
      const userId = await users.createNewUser(ctx, req.body);
      res.send({ id: userId });
    } catch (error) {
      res.status(500).send({ error: 'could not create new user' });
      throw error;
    }
  });

  router.post('/login',
    passport.authenticate('local'),
    (req, res) => {
      res.send({ id: req.user.id });
    });

  router.get('/authenticate',
    requireUserLogin,
    (req, res) => {
      res.send({ id: req.user.id });
    });

  return router;
}

module.exports = getUsersRouter;
