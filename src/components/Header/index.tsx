import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './header.scss';

class Header extends Component {
  state = {
    activePage: window.location.pathname.slice(1),
  };

  handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
            {this.state.activePage === 'home' ? (
              <div className="header__title">Home page</div>
            ) : this.state.activePage === 'about' ? (
              <div className="header__title">About page</div>
            ) : (
              <div className="header__title">Not found page</div>
            )}
          </div>
        </header>
      </>
    );
  }
}

export default Header;
