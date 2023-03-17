import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './header.scss';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <NavLink to="/" className="header__link">
            Home
          </NavLink>
          <NavLink to="/about" className="header__link">
            About
          </NavLink>
        </div>
      </header>
    );
  }
}

export default Header;
