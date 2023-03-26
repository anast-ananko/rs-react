import React from 'react';
import { render } from '@testing-library/react';

import FormData from '.';

describe('FormData', () => {
  it('should render the component with the title, form and cards list', () => {
    const { getByText, getByTestId } = render(<FormData />);
    expect(getByText(/form/i)).toBeInTheDocument();
    expect(getByTestId('form')).toBeInTheDocument();
    expect(getByTestId('cards-list')).toBeInTheDocument();
  });
});
