import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import FormData from './components/FormData';
import NotFound from './components/NotFound';

import './App.scss';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="form" element={<FormData />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
