exports.up = knex => knex.schema
  .createTable('recipes', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('picture').defaultTo(null);
    table.string('description').defaultTo('');
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });

exports.down = knex => knex.schema
  .dropTable('recipes');
