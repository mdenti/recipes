import React from 'react';

import RequestStatus from './RequestStatus';
import { withRecipeContextConsumer } from './RecipeContext';

function RecipeView(props) {
  const { match, recipeCtx } = props;
  const recipe = recipeCtx.recipes.find(r => (r.id === parseInt(match.params.id, 10)));

  if (!recipe && recipeCtx.requestStatus === RequestStatus.RUNNING) {
    return <div>Loading..</div>;
  }
  if (!recipe) {
    return <div>Recipe not found</div>;
  }
  return (
    <div>
      Recipe View
      {recipe.id}
    </div>
  );
}

export default withRecipeContextConsumer(RecipeView);
