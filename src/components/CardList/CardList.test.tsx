import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';

import CardList from '.';

describe('CardList', () => {
  const cards = [
    { id: 1, title: 'Card 1', poster_path: '/image' },
    { id: 2, title: 'Card 2', poster_path: '/image' },
    { id: 3, title: 'Card 3', poster_path: '/image' },
  ];

  const setShowModal = vi.fn();
  const setActiveCardId = vi.fn();

  it('renders a list of CardListItems', () => {
    const { getAllByTestId } = render(
      <CardList cards={cards} setShowModal={setShowModal} setActiveCardId={setActiveCardId} />
    );
    expect(getAllByTestId('card')).toHaveLength(cards.length);
  });
});
