import { Component } from 'react';

import { IFormState, IFormProps } from 'interfaces/form';

const validateInput = (value: string, component: Component<IFormProps, IFormState>): boolean => {
  const re = /[а-яА-ЯёЁa-zA-Z\d]{5,}/;
  let error = '';

  if (value.length === 0) {
    error = 'Error: required field';
  } else if (!re.test(value)) {
    error = 'Error: minimum length is 5 characters';
  } else {
    error = '';
  }
  component.setState({
    inputError: error,
  });

  return error ? false : true;
};

const validateDate = (value: string, component: Component<IFormProps, IFormState>): boolean => {
  let error = '';

  if (!value) {
    error = 'Error: required field';
  } else if (+Date.now() < +new Date(value)) {
    error = 'Error: date cannot be greater than current';
  } else {
    error = '';
  }
  component.setState({
    dateError: error,
  });

  return error ? false : true;
};

const validateSelect = (value: string, component: Component<IFormProps, IFormState>): boolean => {
  let error = '';

  if (value === 'empty') {
    error = 'Error: required field';
  } else {
    error = '';
  }
  component.setState({
    selectError: error,
  });

  return error ? false : true;
};

const validateRadio = (
  value_1: boolean,
  value_2: boolean,
  value_3: boolean,
  component: Component<IFormProps, IFormState>
): boolean => {
  let error = '';

  if (!value_1 && !value_2 && !value_3) {
    error = 'Error: required field';
  } else {
    error = '';
  }
  component.setState({
    radioError: error,
  });

  return error ? false : true;
};

const validateCheckbox = (
  value_1: boolean,
  value_2: boolean,
  component: Component<IFormProps, IFormState>
): boolean => {
  let error = '';

  if (!value_1 && !value_2) {
    error = 'Error: required field';
  } else {
    error = '';
  }
  component.setState({
    checkboxError: error,
  });

  return error ? false : true;
};

const validateFile = (value: string, component: Component<IFormProps, IFormState>): boolean => {
  let error = '';

  if (!value) {
    error = 'Error: required field';
  } else {
    error = '';
  }
  component.setState({
    fileError: error,
  });

  return error ? false : true;
};

export const validateForm = (
  inputRef: string,
  dateRef: string,
  selectRef: string,
  radioRef_1: boolean,
  radioRef_2: boolean,
  radioRef_3: boolean,
  checkboxRef_1: boolean,
  checkboxRef_2: boolean,
  fileRef: string,
  component: Component<IFormProps, IFormState>
): boolean => {
  const validationResults = {
    input: validateInput(inputRef, component),
    date: validateDate(dateRef, component),
    select: validateSelect(selectRef, component),
    radio: validateRadio(radioRef_1, radioRef_2, radioRef_3, component),
    checkbox: validateCheckbox(checkboxRef_1, checkboxRef_2, component),
    file: validateFile(fileRef, component),
  };

  const isFormValid = Object.values(validationResults).every((result) => result);

  component.setState({
    formIsValid: isFormValid,
  });

  return isFormValid;
};
