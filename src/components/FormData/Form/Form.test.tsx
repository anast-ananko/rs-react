import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import Form from '.';

describe('Form', () => {
  it('should show error messages for invalid data', async () => {
    const addCard = vi.fn();
    const { findByText, getByText } = render(<Form addCard={addCard} />);

    await userEvent.click(getByText(/submit/i));

    expect(await findByText(/title is required/i)).toBeInTheDocument();
    expect(await findByText(/date is required/i)).toBeInTheDocument();
    expect(await findByText(/color is required/i)).toBeInTheDocument();
    expect(await findByText(/size is required/i)).toBeInTheDocument();
    expect(await findByText(/gift is required/i)).toBeInTheDocument();
    expect(await findByText(/image is required/i)).toBeInTheDocument();
  });

  it('should submit form data for valid data', async () => {
    const addCard = vi.fn();
    global.URL.createObjectURL = vi.fn(() => 'mock-file-url');
    const { getByTestId, getByLabelText, getByText } = render(<Form addCard={addCard} />);

    await userEvent.type(getByLabelText(/title/i), 'Title');
    await userEvent.type(getByLabelText(/date/i), '2022-01-01');
    await userEvent.selectOptions(getByTestId('color'), 'red');
    await userEvent.type(getByLabelText(/small/i), 'small');
    await userEvent.type(getByLabelText(/postcard/i), 'postcard');

    const testImage = new File(['test'], 'test.png', { type: 'image/png' });
    await userEvent.upload(getByLabelText(/image/i), testImage);

    await userEvent.click(getByText(/submit/i));
    expect(addCard).toHaveBeenCalledTimes(1);
  });
});
