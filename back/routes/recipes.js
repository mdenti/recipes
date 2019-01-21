const express = require('express');

const {
  getAllRecipes,
  addRecipe,
  getRecipeById,
  deleteRecipe,
  updateRecipe,
} = require('../recipes');

function getRecipesRouter(ctx) {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      const recipes = await getAllRecipes(ctx);
      res.send(recipes);
    } catch (error) {
      res.status(error.statusCode || 500).send({ error: 'error fetching the recipes' });
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const recipeData = Object.assign({}, req.body, { userId: req.user.id });
      const newRecipeId = await addRecipe(ctx, recipeData);

      res.send(newRecipeId);
    } catch (error) {
      res.status(error.statusCode || 500).send({ error: 'error adding the new recipe' });
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const recipe = await getRecipeById(ctx, parseInt(req.params.id, 10));
      res.send(recipe);
    } catch (error) {
      res.status(error.statusCode || 500).send({ error: 'error fetching the recipe' });
      next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const recipeId = parseInt(req.params.id, 10);
      const deleted = await deleteRecipe(ctx, recipeId, req.user.id);
      if (!deleted) return res.status(500).send({ error: 'no recipe was deleted, weird stuff..' });
      return res.send();
    } catch (error) {
      res.status(error.statusCode || 500).send({ error: 'error deleting the recipe' });
      return next(error);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      const recipeId = parseInt(req.params.id, 10);
      await updateRecipe(ctx, recipeId, req.user.id, req.body);
      return res.send();
    } catch (error) {
      res.status(error.statusCode || 500).send({ error: 'error updating the recipe' });
      return next(error);
    }
  });

  return router;
}

module.exports = getRecipesRouter;
