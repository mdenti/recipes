exports.up = knex => knex.schema
  .createTable('recipes', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('picture').defaultTo(null);
    table.string('description').defaultTo('');
    table.timestamps();
  });

exports.down = knex => knex.schema
  .dropTable('recipes');
