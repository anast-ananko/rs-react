import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';

describe('App', () => {
  it('renders correctly', async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(
      getByRole('heading', {
        level: 3,
      })
    ).toHaveTextContent('Home');
  });
});
