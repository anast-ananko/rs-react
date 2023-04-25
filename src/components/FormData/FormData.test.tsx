import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import FormData from '.';
import createStore from '../../store';

const store = createStore();

describe('FormData', () => {
  it('should render the component with the title, form and cards list', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <FormData />
      </Provider>
    );
    expect(getByText(/form/i)).toBeInTheDocument();
    expect(getByTestId('form')).toBeInTheDocument();
    expect(getByTestId('cards-list')).toBeInTheDocument();
  });
});
