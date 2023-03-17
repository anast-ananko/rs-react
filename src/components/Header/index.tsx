import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import './header.scss';

const Header: FunctionComponent = ({}) => {
  return (
    <header className="header">
      <div className="container">
        <NavLink to="/" className="header__link">
          Home
        </NavLink>
        <NavLink to="/about" className="header__link">
          About Us
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
