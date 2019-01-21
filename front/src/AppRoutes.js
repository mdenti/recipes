import React from 'react';
import { Switch } from 'react-router-dom';

import LoggedInRoute from './routes/LoggedInRoute';
import LoggedOutRoute from './routes/LoggedOutRoute';

import RecipeList from './recipes/RecipeList';
import RecipeView from './recipes/RecipeView';
import RecipeCreate from './recipes/RecipeCreate';
import Login from './Login';
import Registration from './Registration';
import RecipeEdit from './recipes/RecipeEdit';

function AppRoutes() {
  return (
    <Switch>
      <LoggedOutRoute exact path="/" component={Login} />
      <LoggedOutRoute exact path="/user/register" component={Registration} />
      <LoggedInRoute exact path="/recipes" component={RecipeList} />
      <LoggedInRoute exact path="/recipes/new" component={RecipeCreate} />
      <LoggedInRoute exact path="/recipes/:id" component={RecipeView} />
      <LoggedInRoute exact path="/recipes/:id/edit" component={RecipeEdit} />
    </Switch>
  );
}

export default AppRoutes;
