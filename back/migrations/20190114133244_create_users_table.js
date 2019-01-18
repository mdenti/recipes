exports.up = knex => knex.schema
  .createTable('users', (table) => {
    table.increments();
    table.string('email').notNullable().unique();
    table.string('passwordHash').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });

exports.down = knex => knex.schema
  .dropTable('users');
