import React, { FunctionComponent } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './router';

import './App.scss';

const App: FunctionComponent = () => {
  return <RouterProvider router={router} />;
};

export default App;
