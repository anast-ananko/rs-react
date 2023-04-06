import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import SearchBar from '.';

describe('SearchBar', () => {
  it('should render input and button', () => {
    const query = 'test';
    const setQuery = vi.fn();
    const getCards = vi.fn();
    const { getByRole } = render(
      <SearchBar query={query} setQuery={setQuery} getCards={getCards} />
    );
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should update query in state when user types into input field', async () => {
    const query = 'test';
    const setQuery = vi.fn();
    const getCards = vi.fn();
    const { getByRole } = render(
      <SearchBar query={query} setQuery={setQuery} getCards={getCards} />
    );
    userEvent.type(getByRole('textbox'), 'test');
    await waitFor(() => expect(getByRole('textbox')).toHaveValue('test'));
  });
});
