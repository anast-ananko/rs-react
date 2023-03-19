import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import SearchBar from '.';

describe('SearchBar', () => {
  const initialState = {
    query: '',
  };

  it('should render input and button', () => {
    render(<SearchBar {...initialState} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should update query in state when user types into input field', () => {
    const { container } = render(<SearchBar {...initialState} />);
    const input = container.querySelector('input[type="text"]')!;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });
});
