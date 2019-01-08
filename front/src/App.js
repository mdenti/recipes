import React, { Component } from 'react';
import './App.css';

import defaultRecipes from './DefaultRecipes';
import { withRecipeContextProvider } from './RecipeContext';
import RecipeList from './RecipeList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: defaultRecipes }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <RecipeList />
        </header>
      </div>
    );
  }
}

export default withRecipeContextProvider(App, defaultRecipes);
