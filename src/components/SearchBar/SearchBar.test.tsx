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
  const handleSubmit = vi.fn();

  it('should render input and button', () => {
    const { getByRole } = render(
      <SearchBar query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
    );

    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('updates query when input value changes', async () => {
    const { getByPlaceholderText } = render(
      <SearchBar query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
    );

    fireEvent.change(getByPlaceholderText(/search.../i), { target: { value: 'Matrix' } });
    expect(setQuery).toHaveBeenCalledWith('Matrix');
  });
});
