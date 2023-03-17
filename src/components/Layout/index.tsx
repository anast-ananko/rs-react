import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className="container">
          <Outlet />
        </main>
      </div>
    );
  }
}

export default Layout;
