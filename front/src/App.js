import React, { Component } from 'react';
import './App.css';

import { withRecipeContextProvider } from './RecipeContext';
import RecipeList from './RecipeList';

class App extends Component {
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

export default withRecipeContextProvider(App);
