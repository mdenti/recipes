import React, { Component, createContext } from 'react';

const recipeContext = createContext({
    recipes: [],
    addNewRecipe: () => {},
});

export function withRecipeContextProvider(WrappedComponent, initialRecipes) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                recipes: initialRecipes,
                addNewRecipe: this.addNewRecipe.bind(this),
            };
        }
        addNewRecipe(recipe) {
            this.setState({ recipes: this.state.recipes.concat([recipe])});
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
