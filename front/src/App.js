import React, { Component } from 'react';
import './App.css';

import defaultRecipes from './DefaultRecipes';
import recipeContext from './RecipeContext';
import RecipeList from './RecipeList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: defaultRecipes }
  }
  render() {
    return (
      <recipeContext.Provider value={this.state}>
        <div className="App">
          <header className="App-header">
            <RecipeList />
          </header>
        </div>
      </recipeContext.Provider>
    );
  }
}

export default App;
