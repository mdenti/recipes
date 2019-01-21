const db = require('./db');
const { UnauthorizedError, NotFoundError } = require('../errors');
const { validateRecipe, sanitizeNewRecipe } = require('./utils');

async function getAllRecipes(ctx) {
  return db.getAllRecipes(ctx.knex);
}

async function getRecipeById(ctx, id) {
  const recipe = await db.getRecipeById(ctx.knex, id);
  if (!recipe) throw new NotFoundError(`Recipe not found for id: ${id}`);
  return recipe;
}

async function addRecipe(ctx, recipeData) {
  validateRecipe(recipeData);
  const sanitizedRecipeData = sanitizeNewRecipe(recipeData);
  return db.insertNewRecipe(ctx.knex, sanitizedRecipeData);
}

async function deleteRecipe(ctx, recipeId, userId) {
  const recipe = await getRecipeById(ctx, recipeId);
  if (recipe.userId !== userId) {
    throw new UnauthorizedError('User does not own this recipe.');
  }

  return db.deleteRecipe(ctx.knex, recipeId);
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  deleteRecipe,
};
