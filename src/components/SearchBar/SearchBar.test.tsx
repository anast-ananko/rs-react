import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchBar from '.';

describe('SearchBar', () => {
  const initialState = {
    query: '',
  };

  it('should render input and button', () => {
    const { getByRole } = render(<SearchBar {...initialState} />);
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should update query in state when user types into input field', async () => {
    const { getByRole } = render(<SearchBar {...initialState} />);
    userEvent.type(getByRole('textbox'), 'test');
    await waitFor(() => expect(getByRole('textbox')).toHaveValue('test'));
  });
});
