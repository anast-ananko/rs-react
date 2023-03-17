import React, { Component } from 'react';
import SearchBar from '../SearchBar';
import CardList from '../CardList';

import './home.scss';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h3 className="home__title">Home</h3>
        <SearchBar query="query" />
        <CardList />
      </div>
    );
  }
}

export default Home;
