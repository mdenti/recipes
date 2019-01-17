import React, { Component, createContext } from 'react';

import RequestStatus from '../RequestStatus';
import { addNewRecipe, getRecipes } from '../Api';

const recipeCtx = createContext({
  recipes: [],
  getRecipes: () => {},
  addNewRecipe: () => {},
  requestStatus: RequestStatus.INACTIVE,
});
export default recipeCtx;

export function recipeContextProvider(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        recipes: [],
        getRecipes: this.getRecipes.bind(this),
        addNewRecipe: this.addNewRecipe.bind(this),
        requestStatus: RequestStatus.INACTIVE,
      };
    }

    async getRecipes() {
      this.setState({ requestStatus: RequestStatus.RUNNING });
      try {
        const recipes = await getRecipes();
        this.setState({ recipes, requestStatus: RequestStatus.INACTIVE });
      } catch (error) {
        this.setState({ requestStatus: RequestStatus.FAILED });
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
  };
}

export function recipeContextConsumer(WrappedComponent) {
  return function component(props) {
    return (
      <recipeCtx.Consumer>
        {recipeContext => <WrappedComponent recipeCtx={recipeContext} {...props} />}
      </recipeCtx.Consumer>
    );
  };
}
