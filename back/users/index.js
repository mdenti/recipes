const db = require('./db');
const utils = require('./utils');

async function getUserByEmail(ctx, email) {
  return db.getUserByEmail(ctx.knex, email);
}

async function checkLoginInfo(ctx, { email, password }) {
  const user = await getUserByEmail(ctx, email);
  if (!user || !await utils.passwordMatches(password, user.passwordHash)) {
    return null;
  }
  return user;
}

async function createNewUser(ctx, { email, password }) {
  const user = await getUserByEmail(ctx, email);
  if (user) {
    throw new Error('Email already in use');
  }

  const passwordHash = await utils.hashPassword(password);
  const userData = {
    email,
    passwordHash,
  };

  return db.insertUser(ctx.knex, userData);
}

module.exports = {
  getUserByEmail,
  checkLoginInfo,
  createNewUser,
};
