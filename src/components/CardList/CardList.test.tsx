import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';

import store from '../../store';
import CardList from '.';

describe('CardList', () => {
  const setShowModal = vi.fn();
  const setActiveCardId = vi.fn();

  it('renders a list of CardListItems', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <CardList setShowModal={setShowModal} setActiveCardId={setActiveCardId} />
      </Provider>
    );

    expect(getAllByTestId('cards-list')).toBeInTheDocument;
  });
});
