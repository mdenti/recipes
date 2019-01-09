import React, { Component } from 'react';

import RequestStatus from './RequestStatus';
import { withRecipeContextConsumer } from './RecipeContext';

class RecipeView extends Component {
    render() {
        const { match, recipeCtx } = this.props;
        const recipe = recipeCtx.recipes.find((recipe) => (recipe.id === parseInt(match.params.id)));

        if (!recipe && recipeCtx.requestStatus === RequestStatus.RUNNING) {
            return <div>Loading..</div>;
        } else if (!recipe) {
            return <div>Recipe not found</div>
        }
        return (
            <div>Recipe View {recipe.id}</div>
        );
    }
}

export default withRecipeContextConsumer(RecipeView);
