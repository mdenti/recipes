import React, { Component, createContext } from 'react';

import RequestStatus from './RequestStatus';
import { getRecipes, addNewRecipe } from './Api';

const recipeCtx = createContext({
    recipes: [],
    addNewRecipe: () => {},
    requestStatus: RequestStatus.INACTIVE,
});

export function withRecipeContextProvider(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                recipes: [],
                addNewRecipe: this.addNewRecipe.bind(this),
                requestStatus: RequestStatus.INACTIVE,
            };
        }
        async componentDidMount() {
            this.setState({ requestStatus: RequestStatus.RUNNING });
            try {
                const initialRecipes = await getRecipes();
                this.setState({ recipes: initialRecipes, requestStatus: RequestStatus.INACTIVE });   
            } catch (error) {
                this.setState({ recipes: [], requestStatus: RequestStatus.FAILED });
            }
        }
        async addNewRecipe(recipe) {
            this.setState({ requestStatus: RequestStatus.RUNNING });
            try {
                const recipes = await addNewRecipe(recipe);
                this.setState({ recipes, requestStatus: RequestStatus.INACTIVE });
            } catch (error) {
                this.setState({ requestStatus: RequestStatus.FAILED });
            }
        }
        render() {
            return (
                <recipeCtx.Provider value={this.state}>
                    <WrappedComponent {...this.props} />
                </recipeCtx.Provider>
            );
        }
    }
}

export function withRecipeContextConsumer(WrappedComponent) {
    return class extends Component {
        render() {
            return (
                <recipeCtx.Consumer>
                    {(recipeContext) => <WrappedComponent recipeCtx={recipeContext} {...this.props} />}
                </recipeCtx.Consumer>
            );
        }
    }
}
