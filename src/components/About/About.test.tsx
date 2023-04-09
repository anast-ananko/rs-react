import React from 'react';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import About from '.';

describe('About', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<About />);
    expect(
      getByRole('heading', {
        level: 3,
      })
    ).toHaveTextContent('About Us');
  });
});
