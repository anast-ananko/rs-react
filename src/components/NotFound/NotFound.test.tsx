import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import NotFound from '.';

describe('NotFound', () => {
  it('renders correctly', () => {
    render(<NotFound />);
    expect(
      screen.getByRole('heading', {
        level: 3,
      })
    ).toHaveTextContent('Not found');
  });
});
