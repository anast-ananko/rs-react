import React, { Component } from 'react';
import { ISearchBarState } from '../../interfaces/searchBar';

import './searchBar.scss';

class SearchBar extends Component<ISearchBarState> {
  state = {
    query: '',
  };

  handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: e.target.value,
    });
  };

  render() {
    return (
      <form className="search">
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
