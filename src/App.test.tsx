import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders correctly', async () => {
    const { getByRole } = render(<App />);
    expect(
      getByRole('heading', {
        level: 3,
      })
    ).toHaveTextContent('Home');
  });
});
