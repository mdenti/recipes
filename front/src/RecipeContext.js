import React, { Component, createContext } from 'react';

import { getRecipes, addNewRecipe } from './Api';

const recipeContext = createContext({
    recipes: [],
    addNewRecipe: () => {},
});

export function withRecipeContextProvider(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                recipes: [],
                addNewRecipe: this.addNewRecipe.bind(this),
            };
        }
        async componentDidMount() {
            const initialRecipes = await getRecipes();
            this.setState({ recipes: initialRecipes });
        }
        async addNewRecipe(recipe) {
            const recipes = await addNewRecipe(recipe);
            this.setState({ recipes });
        }
        render() {
            return (
                <recipeContext.Provider value={this.state}>
                    <WrappedComponent {...this.props} />
                </recipeContext.Provider>
            );
        }
    }
}

export function withRecipeContextConsumer(WrappedComponent) {
    return class extends Component {
        render() {
            return (
                <recipeContext.Consumer>
                    {(recipeContext) => <WrappedComponent recipeContext={recipeContext} {...this.props} />}
                </recipeContext.Consumer>
            );
        }
    }
}
