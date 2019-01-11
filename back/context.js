const Knex = require('knex');

const knexConfig = require('./knexfile');

const knex = Knex(knexConfig.development);

/**
 * Returns the context for the app
 */
function getContext() {
  return {
    knex,
  };
}

module.exports = getContext;
