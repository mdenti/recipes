import React, { Component } from 'react';
import './App.css';

import { withRecipeContextProvider } from './RecipeContext';
import AppRoutes from './AppRoutes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AppRoutes />
        </header>
      </div>
    );
  }
}

export default withRecipeContextProvider(App);
