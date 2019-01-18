import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import { userContextConsumer } from './contexts/UserContext';

function Header({ userCtx: { user } }) {
  const loggedInNavigation = [
    <Button to="/recipes" component={NavLink}>Recipes</Button>,
    <Button to="/recipe/create" component={NavLink}>Create new recipe</Button>,
  ];
  const loggedOutNavigation = [
    <Button to="/" component={NavLink}>Login</Button>,
    <Button to="/user/register" component={NavLink}>Register</Button>,
  ];
  return (
    <AppBar position="static" color="default" className="header">
      <Toolbar variant="dense">
        { user ? loggedInNavigation : loggedOutNavigation }
      </Toolbar>
    </AppBar>
  );
}

export default userContextConsumer(Header);
