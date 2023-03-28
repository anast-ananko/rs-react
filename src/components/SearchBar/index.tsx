import React, { FC, useState, useEffect } from 'react';

import './searchBar.scss';

const SearchBar: FC = () => {
  const [query, setQuery] = useState<string>(localStorage.getItem('searchQuery') || '');

  useEffect(() => {
    localStorage.setItem('searchQuery', query);
  }, [query]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
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
