import React from 'react';
import { render } from '@testing-library/react';

import CardListItem from '.';

describe('CardListItem', () => {
  const mockProps = {
    id: 1,
    name: 'Sunflower',
    latinName: 'Helianthus annuus',
    image: 'sunflower.jpg',
  };

  it('renders the component with with correct properties', () => {
    const { getByAltText, getByText } = render(<CardListItem {...mockProps} />);
    expect(getByAltText(mockProps.name)).toBeInTheDocument();
    expect(getByText(mockProps.name)).toBeInTheDocument();
    expect(getByText(mockProps.latinName)).toBeInTheDocument();
  });
});
