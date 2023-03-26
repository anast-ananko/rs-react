import { Component } from 'react';
import { vi } from 'vitest';

import { IFormProps, IFormState } from '../interfaces/form';
import { validateForm } from './validationFunctions';

describe('validateForm', () => {
  it('should return true when all form fields are valid', () => {
    const mockComponent: Component<IFormProps, IFormState> = {
      setState: vi.fn(),
      props: {
        addCard: () => {},
      },
      state: {
        formIsValid: true,
        inputError: 'input',
        dateError: 'date',
        selectError: 'select',
        radioError: 'radio',
        checkboxError: 'checkbox',
        fileError: 'file',
      },
      context: vi.fn(),
      forceUpdate: vi.fn(),
      render: vi.fn(),
      refs: {},
    };

    const inputRef = 'input';
    const dateRef = 'date';
    const selectRef = 'select';
    const radioRef_1 = true;
    const radioRef_2 = false;
    const radioRef_3 = false;
    const checkboxRef_1 = true;
    const checkboxRef_2 = false;
    const fileRef = 'file';

    const result = validateForm(
      inputRef,
      dateRef,
      selectRef,
      radioRef_1,
      radioRef_2,
      radioRef_3,
      checkboxRef_1,
      checkboxRef_2,
      fileRef,
      mockComponent
    );

    expect(result).toBe(true);
  });
});
