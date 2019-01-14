const db = require('./db');
const utils = require('./utils');

async function getUserByEmail(ctx, email) {
  return db.getUserByEmail(ctx.knex, email);
}

async function checkLoginInfo(ctx, { email, password }) {
  const user = await getUserByEmail(ctx.knex, email);
  if (!user) {
    throw new Error('User does not exist');
  }
  if (!await utils.passwordMatches(password, user.passwordHash)) {
    throw new Error('Wrong password');
  }
  return user;
}

async function createNewUser(ctx, { email, password }) {
  const user = await getUserByEmail(ctx.knex, email);
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
