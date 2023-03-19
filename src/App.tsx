import React, { FunctionComponent } from 'react';
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';

import './App.scss';

import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="404" replace />} />
    </Route>
  )
);

const App: FunctionComponent = () => {
  return <RouterProvider router={router} />;
};

export default App;
