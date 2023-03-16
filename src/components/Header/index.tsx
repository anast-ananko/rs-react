import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const Header: FunctionComponent = ({}) => {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
    </header>
  );
};

export default Header;
