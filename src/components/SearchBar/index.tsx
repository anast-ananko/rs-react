import React, { FC, useState, useEffect, useRef } from 'react';

import './searchBar.scss';

const SearchBar: FC = () => {
  const queryObj = localStorage.getItem('searchQuery');
  const queryParseObj = queryObj ? JSON.parse(queryObj) : '';
  const [query, setQuery] = useState<string>(queryParseObj);
  const queryRef = useRef<string | undefined>();

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  useEffect(() => {
    return () => {
      localStorage.setItem('searchQuery', JSON.stringify(queryRef.current));
    };
  }, []);

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
