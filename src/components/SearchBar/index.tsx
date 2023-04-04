import React, { FC } from 'react';

import './searchBar.scss';

interface ISearchBar {
  query: string;
  setQuery: (query: string) => void;
  getCards: (query: string) => void;
}

const SearchBar: FC<ISearchBar> = ({ query, setQuery, getCards }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    getCards(query);
    localStorage.setItem('searchQuery', JSON.stringify(query));
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  return (
    <form data-testid="form" className="search" onSubmit={handleSubmit}>
      <div className="search__input">
        <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
        <input type="text" value={query} onChange={handleQuery} placeholder="Search..." />
      </div>
      <button data-testid="search__button" className="search__button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
