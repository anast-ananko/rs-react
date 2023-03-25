import React from 'react';
import { render } from '@testing-library/react';

import FormCardsList from '.';

describe('FormCardsList', () => {
  it('renders form cards list', () => {
    const cards = [
      {
        title: 'Card 1',
        date: '2022-01-01',
        color: 'red',
        size: 'small',
        checkbox: 'card-1',
        image: 'https://example.com/image1.jpg',
      },
      {
        title: 'Card 2',
        date: '2022-02-02',
        color: 'blue',
        size: 'medium',
        checkbox: 'card-2',
        image: 'https://example.com/image2.jpg',
      },
    ];

    const { getByTestId, getAllByTestId } = render(<FormCardsList cards={cards} />);

    expect(getByTestId('cards-list')).toBeInTheDocument();
    expect(getAllByTestId('form-card')).toHaveLength(cards.length);
  });
});
