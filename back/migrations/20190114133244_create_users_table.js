exports.up = knex => knex.schema
  .createTable('users', (table) => {
    table.increments();
    table.string('email').notNullable().unique();
    table.string('passwordHash').notNullable();
    table.timestamps();
  });

exports.down = knex => knex.schema
  .dropTable('users');
