import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import Form from '.';

describe('Form', () => {
  it('should show error messages for invalid data', async () => {
    const addCard = vi.fn();
    const { findByText, getByText } = render(<Form addCard={addCard} />);

    userEvent.click(getByText(/submit/i));

    expect(await findByText(/title is required/i)).toBeInTheDocument();
    expect(await findByText(/date is required/i)).toBeInTheDocument();
    expect(await findByText(/color is required/i)).toBeInTheDocument();
    expect(await findByText(/size is required/i)).toBeInTheDocument();
    expect(await findByText(/gift is required/i)).toBeInTheDocument();
    expect(await findByText(/image is required/i)).toBeInTheDocument();
  });
});
