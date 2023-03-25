import React from 'react';
import { render } from '@testing-library/react';
import flowers from '../../data/flowers.json';

import CardList from '.';

describe('CardList', () => {
  it('renders a list of CardListItems', () => {
    const { getAllByTestId } = render(<CardList flowers={flowers} />);
    expect(getAllByTestId('card')).toHaveLength(flowers.length);
  });
});
