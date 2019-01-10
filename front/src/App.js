import React, { Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';

import { withRecipeContextProvider } from './RecipeContext';

import Header from './Header';
import AppRoutes from './AppRoutes';

function App() {
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

export default withRecipeContextProvider(App);
