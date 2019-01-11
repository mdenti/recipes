import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

function Header() {
  return (
    <AppBar position="static" color="default" className="header">
      <Toolbar variant="dense">
        <Button to="/recipes" component={NavLink}>Recipes</Button>
        <Button to="/recipe/create" component={NavLink}>Create new recipe</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
