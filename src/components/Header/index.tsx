import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { headerTitle } from '../../helpers/headerTitle';

import './header.scss';

class Header extends Component {
  state = {
    activePage: window.location.pathname === '/' ? 'home' : window.location.pathname.slice(1),
  };

  handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    const element = e.target as HTMLElement;
    this.setState({
      activePage: element.getAttribute('data-name'),
    });
  };

  render() {
    return (
      <>
        <header className="header">
          <div className="container header__container">
            <NavLink data-name="home" to="/" className="header__link" onClick={this.handleClick}>
              Home
            </NavLink>
            <NavLink
              data-name="about"
              to="/about"
              className="header__link"
              onClick={this.handleClick}
            >
              About
            </NavLink>
            <NavLink
              data-name="form"
              to="/form"
              className="header__link"
              onClick={this.handleClick}
            >
              Form
            </NavLink>
            <div className="header__title">{headerTitle(this.state.activePage)}</div>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
