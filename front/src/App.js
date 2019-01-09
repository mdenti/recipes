import React, { Component } from 'react';
import './App.css';

import { withRecipeContextProvider } from './RecipeContext';

import Header from './Header';
import AppRoutes from './AppRoutes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <AppRoutes />
      </div>
    );
  }
}

export default withRecipeContextProvider(App);
