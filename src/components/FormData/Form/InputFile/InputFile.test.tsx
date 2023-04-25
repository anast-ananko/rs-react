import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputFile from '.';
import { vi } from 'vitest';

const register = vi.fn();

describe('InputFile component', () => {
  it('should render the input field with label', () => {
    const { getByLabelText } = render(<InputFile register={register} errors={{}} />);

    expect(getByLabelText(/image/i)).toBeInTheDocument();
  });

  it('should not display error message when valid image type is selected', async () => {
    const { getByLabelText, queryByText } = render(<InputFile register={register} errors={{}} />);
    const input = getByLabelText(/image/i);
    const file = new File(['dummy content'], 'dummy.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });

    expect(queryByText(/invalid file format/i)).toBeNull();
  });
});
