const express = require('express');

const { getAllRecipes, addRecipe, getRecipeById } = require('../recipes');

function getRecipesRouter(ctx) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const recipes = await getAllRecipes(ctx);
      res.send(recipes);
    } catch (error) {
      res.status(error.statusCode || 500).send({ error: 'error fetching the recipes' });
      throw error;
    }
  });

  router.post('/', async (req, res) => {
    try {
      const newRecipeId = await addRecipe(ctx, req.body);
      const newRecipe = await getRecipeById(ctx, newRecipeId);

      if (!newRecipe) return res.status(500).send({ error: 'there was a problem adding the new recipe' });
      return res.send(newRecipe);
    } catch (error) {
      res.status(error.statusCode || 500).send({ error: 'error adding the new recipe' });
      throw error;
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const recipe = await getRecipeById(ctx, parseInt(req.params.id, 10));
      if (!recipe) res.status(404).send({ error: 'could not find recipe' });
      res.send(recipe);
    } catch (error) {
      res.status(error.statusCode || 500).send({ error: 'error fetching the recipe' });
      throw error;
    }
  });

  return router;
}

module.exports = getRecipesRouter;
