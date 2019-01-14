const { RECIPE_TABLE_NAME } = require('./utils');

async function getAllRecipes(knex) {
  return knex(RECIPE_TABLE_NAME)
    .select();
}

async function getRecipeById(knex, id) {
  return knex(RECIPE_TABLE_NAME)
    .select()
    .where({ id })
    .first();
}

async function insertNewRecipe(knex, recipeData) {
  return knex(RECIPE_TABLE_NAME)
    .insert(recipeData)
    .returning('id');
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  insertNewRecipe,
};
