import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { vi } from 'vitest';

import CardListItem from '.';
import { ISearchCard } from '../../../interfaces/searchCard';

describe('CardListItem', () => {
  const card1: ISearchCard = { id: 1, title: 'Card 1', poster_path: '/image' };
  const card2: ISearchCard = { id: 1, title: 'Card 2', poster_path: '/image' };

  const setShowModal = vi.fn();
  const setActiveCardId = vi.fn();

  afterEach(() => {
    cleanup();
  });

  it('renders the component with with correct properties', () => {
    const { getByAltText, getByText } = render(
      <CardListItem card={card1} setShowModal={setShowModal} setActiveCardId={setActiveCardId} />
    );

    expect(getByAltText(card1.title)).toBeInTheDocument();
    expect(getByText(card1.title)).toBeInTheDocument();
  });

  it('opens modal when clicked', () => {
    const { getByTestId } = render(
      <CardListItem card={card2} setShowModal={setShowModal} setActiveCardId={setActiveCardId} />
    );
    const card = getByTestId('card');
    fireEvent.click(card);

    expect(setShowModal).toHaveBeenCalledWith(true);
    expect(setActiveCardId).toHaveBeenCalledWith(1);
  });
});
