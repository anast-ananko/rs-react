import { IValidationCheckbox } from '../interfaces/validationCheckbox';
import { IValidationRadio } from '../interfaces/validationRadio';

export const validateCheckbox = (values: IValidationCheckbox['gift']) => {
  if (!values || values.length === 0) {
    return 'Gift is required';
  }
  return true;
};

export const validateRadio = (value: IValidationRadio['size']) => {
  if (!value) {
    return 'Size is required';
  }
  return true;
};
