import React, { Component } from 'react';
import { ISearchBarState } from '../../interfaces/searchBarState';

import './searchBar.scss';

class SearchBar extends Component<ISearchBarState> {
  state = {
    query: localStorage.getItem('searchQuery') || '',
  };

  componentWillUnmount = (): void => {
    localStorage.setItem('searchQuery', this.state.query);
  };

  handleQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      query: e.target.value,
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  render() {
    return (
      <form data-testid="form" className="search" onSubmit={this.handleSubmit}>
        <div className="search__input">
          <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleQuery}
            placeholder="Search..."
          />
        </div>
        <button data-testid="search__button" className="search__button" type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
