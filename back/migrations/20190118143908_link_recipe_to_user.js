exports.up = knex => knex.schema
  .table('recipes', (table) => {
    table.integer('user_id').unsigned();
  });

exports.down = knex => knex.schema
  .table('recipes', (table) => {
    table.dropColumn('user_id');
  });
