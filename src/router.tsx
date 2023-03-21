import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
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

export default router;
