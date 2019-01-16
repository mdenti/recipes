import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RecipeList from './RecipeList';
import RecipeView from './RecipeView';
import RecipeCreate from './RecipeCreate';
import Login from './Login';
import Registration from './Registration';

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/recipes" component={RecipeList} />
      <Route exact path="/recipe/create" component={RecipeCreate} />
      <Route exact path="/recipe/:id" component={RecipeView} />
      <Route exact path="/user/register" component={Registration} />
    </Switch>
  );
}

export default AppRoutes;
