import React, { Component } from 'react';

import RequestStatus from '../RequestStatus';
import { recipeContextConsumer } from '../contexts/RecipeContext';

class RecipeView extends Component {
  async componentDidMount() {
    const { match, recipeCtx } = this.props;
    await recipeCtx.getRecipe(match.params.id);
  }

  render() {
    const { recipeCtx } = this.props;

    if (!recipeCtx.recipe && recipeCtx.requestStatus === RequestStatus.RUNNING) {
      return <div>Loading..</div>;
    }
    if (!recipeCtx.recipe) {
      return <div>Recipe not found</div>;
    }
    return (
      <div>
        Recipe View
        {recipeCtx.recipe.id}
      </div>
    );
  }
}

export default recipeContextConsumer(RecipeView);
