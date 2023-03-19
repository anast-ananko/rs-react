import React from 'react';
import { render } from '@testing-library/react';
import flowers from '../../data/flowers.json';

import CardList from '.';

describe('CardList', () => {
  it('renders a list of CardListItems', () => {
    const { container } = render(<CardList flowers={flowers} />);
    const cardListItems = container.querySelectorAll('.cards__list .card');
    expect(cardListItems.length).toBe(flowers.length);
  });
});
