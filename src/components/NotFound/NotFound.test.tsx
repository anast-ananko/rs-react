import React from 'react';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import NotFound from '.';

describe('NotFound', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<NotFound />);
    expect(
      getByRole('heading', {
        level: 3,
      })
    ).toHaveTextContent('Not found');
  });
});
