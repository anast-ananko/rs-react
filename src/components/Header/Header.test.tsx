import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from '.';

describe('Header', () => {
  it('should render header links', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const links = getAllByRole('link');
    expect(links).toHaveLength(3);
  });
});
