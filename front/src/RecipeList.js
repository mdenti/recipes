import React, { Component, Fragment } from 'react';

import recipeContext from './RecipeContext';

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
            <recipeContext.Consumer>
                {({ recipes }) => (
                    <Fragment>
                        <div>Recipe list</div>
                        <div>
                            {recipes.map((recipe) => <RecipeListItem recipe={recipe} key={recipe.id} />)}
                        </div>
                    </Fragment>
                )}
            </recipeContext.Consumer>
        );
    }
}

export default RecipeList;