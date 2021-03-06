const passport = require('passport');
const { Strategy } = require('passport-local');

const users = require('./users');

function configureAuthentication(ctx) {
  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, cb) => {
    try {
      const user = await users.checkLoginInfo(ctx, { email, password });
      if (!user) return cb(null, false);
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  }));

  passport.serializeUser(({ id }, cb) => {
    cb(null, { id });
  });

  passport.deserializeUser(({ id }, cb) => {
    cb(null, { id });
  });

  return passport;
}

function requireUserLogin(req, res, next) {
  if (!req.user || !req.user.id) {
    return res.status(401).send();
  }
  return next();
}

module.exports = {
  configureAuthentication,
  requireUserLogin,
};
