import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import About from '.';

describe('About', () => {
  it('renders correctly', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', {
        level: 3,
      })
    ).toHaveTextContent('About Us');
  });
});
