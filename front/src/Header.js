import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header>
                <NavLink to="/recipes">Recipes</NavLink>
            </header>
        );
    }
}

export default Header;
