import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';

import CardListItem from '.';

describe('CardListItem', () => {
  const card = { id: 1, title: 'Card 1', poster_path: '/image' };

  const setShowModal = vi.fn();
  const setActiveCardId = vi.fn();

  it('renders the component with with correct properties', () => {
    const { getByAltText, getByText } = render(
      <CardListItem card={card} setShowModal={setShowModal} setActiveCardId={setActiveCardId} />
    );
    expect(getByAltText(card.poster_path)).toBeInTheDocument();
    expect(getByText(card.title)).toBeInTheDocument();
  });
});
