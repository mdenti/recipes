import React, { Component, Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';

import { withRecipeContextProvider } from './RecipeContext';

import Header from './Header';
import AppRoutes from './AppRoutes';

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Header />
        <main>
          <AppRoutes />
        </main>
      </Fragment>
    );
  }
}

export default withRecipeContextProvider(App);
