import React, { FC } from 'react';
import SearchBar from '../SearchBar';
import CardList from '../CardList';
import flowers from '../../data/flowers.json';

import './home.scss';

const Home: FC = () => {
  return (
    <div className="home">
      <h3 className="home__title">Home</h3>
      <SearchBar />
      <CardList flowers={flowers} />
    </div>
  );
};

export default Home;
