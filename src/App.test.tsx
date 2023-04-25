import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import App from './App';
import createStore from './store';

const store = createStore();

describe('App', () => {
  it('renders correctly', async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(
      getByRole('heading', {
        level: 3,
      })
    ).toHaveTextContent('Home');
  });
});
