const db = require('./db');
const { validateRecipe, sanitizeNewRecipe } = require('./utils');

async function getAllRecipes(ctx) {
  return db.getAllRecipes(ctx.knex);
}

async function getRecipeById(ctx, id) {
  return db.getRecipeById(ctx.knex, id);
}

async function addRecipe(ctx, recipeData) {
  validateRecipe(recipeData);
  const sanitizedRecipeData = sanitizeNewRecipe(recipeData);
  return db.insertNewRecipe(ctx.knex, sanitizedRecipeData);
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
};
