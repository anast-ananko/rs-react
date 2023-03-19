import React, { Component } from 'react';
import SearchBar from '../SearchBar';
import CardList from '../CardList';
import flowers from '../../data/flowers.json';

import './home.scss';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h3 className="home__title">Home</h3>
        <SearchBar query="query" />
        <CardList flowers={flowers} />
      </div>
    );
  }
}

export default Home;
