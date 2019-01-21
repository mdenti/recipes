import React, { Component, createContext } from 'react';

import RequestStatus from '../RequestStatus';
import {
  addNewRecipe, getRecipes, getRecipe, deleteRecipe,
} from '../Api';

const recipeCtx = createContext({
  recipe: null,
  recipes: [],
  getRecipes: () => {},
  addNewRecipe: () => {},
  deleteRecipe: () => {},
  requestStatus: RequestStatus.INACTIVE,
});
export default recipeCtx;

export function recipeContextProvider(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        recipe: null,
        recipes: [],
        getRecipe: this.getRecipe.bind(this),
        getRecipes: this.getRecipes.bind(this),
        addNewRecipe: this.addNewRecipe.bind(this),
        deleteRecipe: this.deleteRecipe.bind(this),
        requestStatus: RequestStatus.INACTIVE,
      };
    }

    async getRecipe(id) {
      this.setState({ requestStatus: RequestStatus.RUNNING });
      try {
        const recipe = await getRecipe(id);
        this.setState({ recipe, requestStatus: RequestStatus.INACTIVE });
      } catch (error) {
        this.setState({ requestStatus: RequestStatus.FAILED });
      }
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
        await addNewRecipe(recipe);
        this.setState({ requestStatus: RequestStatus.INACTIVE });
      } catch (error) {
        this.setState({ requestStatus: RequestStatus.FAILED });
      }
    }

    async deleteRecipe(recipe) {
      this.setState({ requestStatus: RequestStatus.RUNNING });
      try {
        await deleteRecipe(recipe);
        this.setState({ requestStatus: RequestStatus.INACTIVE });
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
