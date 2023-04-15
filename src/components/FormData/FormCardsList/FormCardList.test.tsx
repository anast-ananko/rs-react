import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';

import { useAppSelector } from '../../../hook';
import store from '../../../store';
import FormCardsList from '.';

vi.mock('../../../hook');

describe('FormCardsList', () => {
  const cards = [
    {
      title: 'Card 1',
      date: '01-01-2022',
      color: 'red',
      size: 'small',
      gift: 'Postcard',
      image: 'https://example.com/image1',
    },
    {
      title: 'Card 2',
      date: '02-02-2022',
      color: 'blue',
      size: 'medium',
      gift: 'Trinket',
      image: 'https://example.com/image2',
    },
  ];

  (useAppSelector as jest.Mock).mockReturnValue({ cards });

  it('renders list of cards correctly', () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <FormCardsList />
      </Provider>
    );

    const cardsListElement = getByTestId('cards-list');
    const cardsElements = getAllByTestId('form-card');

    expect(cardsListElement).toBeInTheDocument();
    expect(cardsElements).toHaveLength(2);

    expect(cardsElements[0]).toHaveTextContent('Title: Card 1');
    expect(cardsElements[0]).toHaveTextContent('Date: 01-01-2022');
    expect(cardsElements[0]).toHaveTextContent('Color: red');
    expect(cardsElements[0]).toHaveTextContent('Size: small');
    expect(cardsElements[0]).toHaveTextContent('Gift: Postcard');

    expect(cardsElements[1]).toHaveTextContent('Title: Card 2');
    expect(cardsElements[1]).toHaveTextContent('Date: 02-02-2022');
    expect(cardsElements[1]).toHaveTextContent('Color: blue');
    expect(cardsElements[1]).toHaveTextContent('Size: medium');
    expect(cardsElements[1]).toHaveTextContent('Gift: Trinket');
  });
});
