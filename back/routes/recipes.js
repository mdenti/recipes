const express = require('express');

const { getAllRecipes, addRecipe, getRecipeById } = require('../recipes');

function getRecipesRouter(ctx) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const recipes = await getAllRecipes(ctx);
    res.send(recipes);
  });

  router.post('/', async (req, res) => {
    const newRecipeId = await addRecipe(ctx, req.body);
    const newRecipe = await getRecipeById(ctx, newRecipeId);
    res.send(newRecipe);
  });

  return router;
}

module.exports = getRecipesRouter;
