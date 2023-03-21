import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { headerTitle } from '../../helpers/headerTitle';

import './header.scss';

class Header extends Component {
  state = {
    activePage: window.location.pathname === '/' ? 'home' : window.location.pathname.slice(1),
  };

  handleClick = (): void => {
    this.setState({
      activePage: window.location.pathname === '/' ? 'home' : window.location.pathname.slice(1),
    });
  };

  render() {
    return (
      <>
        <header className="header">
          <div className="container header__container">
            <NavLink to="/" className="header__link" onClick={this.handleClick}>
              Home
            </NavLink>
            <NavLink to="/about" className="header__link" onClick={this.handleClick}>
              About
            </NavLink>
            <NavLink to="/form" className="header__link" onClick={this.handleClick}>
              Form
            </NavLink>
            <div className="header__title">{headerTitle()}</div>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
