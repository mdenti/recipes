import React from 'react';
import { Route, Switch } from 'react-router-dom';

import requireLoggedInUser from './authentication/requireLoggedInUser';
import requireLoggedOutUser from './authentication/requireLoggedOutUser';

import RecipeList from './RecipeList';
import RecipeView from './RecipeView';
import RecipeCreate from './RecipeCreate';
import Login from './Login';
import Registration from './Registration';

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={requireLoggedOutUser(Login)} />
      <Route exact path="/user/register" component={requireLoggedOutUser(Registration)} />
      <Route exact path="/recipes" component={requireLoggedInUser(RecipeList)} />
      <Route exact path="/recipe/create" component={requireLoggedInUser(RecipeCreate)} />
      <Route exact path="/recipe/:id" component={requireLoggedInUser(RecipeView)} />
    </Switch>
  );
}

export default AppRoutes;
