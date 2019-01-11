exports.up = (knex) => {
  knex.schema.createTable('recipes', (table) => {
    table.increments();
    table.string('name');
    table.string('picture');
    table.string('description');
    table.timestamps();
  });
};

exports.down = (knex) => {
  knex.schema.dropTable('recipes');
};
