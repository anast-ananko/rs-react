import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { vi } from 'vitest';

import SearchBar from '.';

describe('SearchBar', () => {
  afterEach(() => {
    cleanup();
  });

  const query = '';
  const setQuery = vi.fn();
  const getCards = vi.fn();

  it('should render input and button', () => {
    const { getByRole } = render(
      <SearchBar query={query} setQuery={setQuery} getCards={getCards} />
    );

    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('calls getCards function when search button is clicked', () => {
    const { getByTestId } = render(
      <SearchBar query={query} setQuery={setQuery} getCards={getCards} />
    );

    fireEvent.click(getByTestId('search__button'));
    expect(getCards).toHaveBeenCalled();
  });

  it('updates query when input value changes', async () => {
    const { getByPlaceholderText } = render(
      <SearchBar query={query} setQuery={setQuery} getCards={getCards} />
    );

    fireEvent.change(getByPlaceholderText(/search.../i), { target: { value: 'Matrix' } });
    expect(setQuery).toHaveBeenCalledWith('Matrix');
  });
});
