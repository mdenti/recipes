const { USER_TABLE_NAME } = require('./utils');

async function getUserByEmail(knex, email) {
  return knex(USER_TABLE_NAME)
    .select()
    .where({ email })
    .first();
}

async function insertUser(knex, userData) {
  return knex(USER_TABLE_NAME)
    .insert(userData)
    .returning('id');
}

module.exports = {
  getUserByEmail,
  insertUser,
};
