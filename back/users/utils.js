const bcrypt = require('bcrypt');

const USER_TABLE_NAME = 'users';

const saltRounds = 10;
async function hashPassword(password) {
  return bcrypt.hash(password, saltRounds);
}

async function passwordMatches(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  USER_TABLE_NAME,
  hashPassword,
  passwordMatches,
};
