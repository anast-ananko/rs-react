import React, { FC } from 'react';

import { ISearchBar } from '../../interfaces/searchBar';

import './searchBar.scss';

const SearchBar: FC<ISearchBar> = ({ inputQuery, setInputQuery, handleSubmit }) => {
  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputQuery(e.target.value);
  };

  return (
    <form data-testid="form" className="search" onSubmit={handleSubmit}>
      <div className="search__input">
        <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
        <input type="text" value={inputQuery} onChange={handleQuery} placeholder="Search..." />
      </div>
      <button data-testid="search__button" className="search__button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
