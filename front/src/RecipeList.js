import React, { Component, Fragment } from 'react';

import { withRecipeContextConsumer } from './RecipeContext';

class RecipeListItem extends Component {
    render() {
        const { recipe: { name, picture } } = this.props;
        return (
            <div>
                <img src={picture} alt={name}/>
                <div>{name}</div>
            </div>
        );
    }
}

class RecipeList extends Component {
    render() {
        return (
            <Fragment>
                <div>Recipe list</div>
                <div>
                    {this.props.recipes.map((recipe) => <RecipeListItem recipe={recipe} key={recipe.id} />)}
                </div>
            </Fragment>
        );
    }
}

export default withRecipeContextConsumer(RecipeList);