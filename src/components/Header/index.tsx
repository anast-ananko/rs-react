import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { getHeaderTitle } from '../../helpers/getHeaderTitle';

import './header.scss';

const Header: FC = () => {
  const location = useLocation();
  const pageName = getHeaderTitle(location.pathname);

  return (
    <>
      <header className="header">
        <div className="container header__container">
          <NavLink to="/" className="header__link">
            Home
          </NavLink>
          <NavLink to="/about" className="header__link">
            About
          </NavLink>
          <NavLink to="/form" className="header__link">
            Form
          </NavLink>
          <div className="header__title">{pageName}</div>
        </div>
      </header>
    </>
  );
};

export default Header;
