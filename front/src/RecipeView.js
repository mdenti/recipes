import React, { Component } from 'react';

import { withRecipeContextConsumer } from './RecipeContext';

class RecipeView extends Component {
    render() {
        const { match, recipeCtx } = this.props;
        const recipe = recipeCtx.recipes.find((recipe) => (recipe.id === parseInt(match.params.id)));

        if (!recipe) {
            return <div>Loading..</div>;
        }
        return (
            <div>Recipe View {recipe.id}</div>
        );
    }
}

export default withRecipeContextConsumer(RecipeView);
