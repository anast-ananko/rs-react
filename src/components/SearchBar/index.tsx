import React, { Component } from 'react';
import { ISearchBarState } from '../../interfaces/searchBarState';

import './searchBar.scss';

class SearchBar extends Component<ISearchBarState> {
  state = {
    query: localStorage.getItem('searchQuery') || '',
  };

  handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    this.setState({
      query,
    });
    localStorage.setItem('searchQuery', query);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit}>
        <div className="search__input">
          <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleQuery}
            placeholder="Search..."
          />
        </div>
        <button className="search__button" type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
