import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';

const Layout: FC = () => {
  return (
    <div>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
