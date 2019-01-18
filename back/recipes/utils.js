const { InputError } = require('../errors');

const RECIPE_TABLE_NAME = 'recipes';

const NEW_RECIPE_ALLOWED_FIELDS = [
  'name', 'picture', 'description', 'userId',
];
function sanitizeNewRecipe(input) {
  if (!input) return false;

  return Object.keys(input)
    .filter(v => NEW_RECIPE_ALLOWED_FIELDS.includes(v))
    .reduce((acc, curr) => Object.assign({}, acc, { [curr]: input[curr] }), {});
}


const REQUIRED_RECIPE_FIELDS = ['name'];
function validateRecipe(input) {
  if (!input) {
    throw new InputError('Validation failed: Recipe should not be NULL');
  }

  REQUIRED_RECIPE_FIELDS.forEach((f) => {
    if (!input[f] || !input[f].length) {
      throw new InputError(`Validation failed: field ${f} cannot be empty`);
    }
  });

  return true;
}

module.exports = {
  RECIPE_TABLE_NAME,
  sanitizeNewRecipe,
  validateRecipe,
};
