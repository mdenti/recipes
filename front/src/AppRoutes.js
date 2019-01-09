import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RecipeList from './RecipeList';
import RecipeView from './RecipeView';

class AppRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={RecipeList} />
                <Route exact path='/recipes' component={RecipeList} />
                <Route exact path='/recipe/:id' component={RecipeView} />
            </Switch>
        );
    }
}

export default AppRoutes;
