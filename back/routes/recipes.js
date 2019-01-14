const express = require('express');

const { getAllRecipes, addRecipe, getRecipeById } = require('../recipes');

function getRecipesRouter(ctx) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const recipes = await getAllRecipes(ctx);
      res.send(recipes);
    } catch (error) {
      res.status(500).send({ error: 'could not fetch recipes' });
      throw error;
    }
  });

  router.post('/', async (req, res) => {
    try {
      const newRecipeId = await addRecipe(ctx, req.body);
      const newRecipe = await getRecipeById(ctx, newRecipeId);
      res.send(newRecipe);
    } catch (error) {
      res.status(400).send({ error: 'could not add new recipe' });
      throw error;
    }
  });

  return router;
}

module.exports = getRecipesRouter;
