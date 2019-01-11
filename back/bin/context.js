const path = require('path');
const Knex = require('knex');

const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '..', 'dev.sqlite'),
  },
});

/**
 * Returns the context for the app
 */
export default function getContext() {
  return {
    knex,
  };
}
