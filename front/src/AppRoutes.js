import React from 'react';
import { Switch } from 'react-router-dom';

import LoggedInRoute from './routes/LoggedInRoute';
import LoggedOutRoute from './routes/LoggedOutRoute';

import RecipeList from './RecipeList';
import RecipeView from './RecipeView';
import RecipeCreate from './RecipeCreate';
import Login from './Login';
import Registration from './Registration';

function AppRoutes() {
  return (
    <Switch>
      <LoggedOutRoute exact path="/" component={Login} />
      <LoggedOutRoute exact path="/user/register" component={Registration} />
      <LoggedInRoute exact path="/recipes" component={RecipeList} />
      <LoggedInRoute exact path="/recipe/create" component={RecipeCreate} />
      <LoggedInRoute exact path="/recipe/:id" component={RecipeView} />
    </Switch>
  );
}

export default AppRoutes;
