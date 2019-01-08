import React, { Component, createContext } from 'react';

const recipeContext = createContext({ recipes: {} });

export function withRecipeContextProvider(WrappedComponent, initialRecipes) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = { recipes: initialRecipes };
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
                    {({ recipes }) => <WrappedComponent recipes={recipes} {...this.props} />}
                </recipeContext.Consumer>
            );
        }
    }
}
