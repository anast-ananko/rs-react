import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import Form from '.';

describe('Form', () => {
  it('should be cleared after submit', () => {
    const addCardMock = vi.fn();
    const { getByLabelText, getByRole, getByTestId } = render(<Form addCard={addCardMock} />);

    userEvent.type(getByLabelText(/title/i), 'Mimoza');
    userEvent.type(getByLabelText(/date/i), '2023-03-26');
    userEvent.selectOptions(getByRole('combobox'), 'red');
    userEvent.click(getByLabelText(/medium/i));
    userEvent.click(getByLabelText(/postcard/i));
    userEvent.type(getByLabelText(/image/i), 'image.png');

    fireEvent.submit(getByTestId('form'));

    expect(getByLabelText(/title/i)).toHaveValue('');
    expect(getByLabelText(/date/i)).toHaveValue('');
    expect(getByRole('combobox')).not.toBeChecked();
    expect(getByLabelText(/small/i)).not.toBeChecked();
    expect(getByLabelText(/medium/i)).not.toBeChecked();
    expect(getByLabelText(/big/i)).not.toBeChecked();
    expect(getByLabelText(/postcard/i)).not.toBeChecked();
    expect(getByLabelText(/trinket/i)).not.toBeChecked();
    expect(getByLabelText(/image/i)).toHaveValue('');
  });

  it('should show error messages for invalid data', async () => {
    const addCard = vi.fn();
    const { findByText, findAllByText, getByText } = render(<Form addCard={addCard} />);

    userEvent.click(getByText(/add card/i));

    const errorMessages = await Promise.all([
      findByText(/error: minimum length is 5 characters/i),
      ...(await findAllByText(/error: required field/i)),
    ]);
    errorMessages.forEach((errorMessage) => {
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
