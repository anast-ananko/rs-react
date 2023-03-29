import { IValidationCheckbox } from '../interfaces/validationCheckbox';
import { IValidationRadio } from '../interfaces/validationRadio';

export const validateCheckbox = (value: string, otherValues: IValidationCheckbox['gift']) => {
  if (!otherValues || Object.keys(otherValues).length === 0) {
    return 'Gift is required';
  }
  const selectedValues = Object.values(otherValues).filter((v) => v === value);
  if (selectedValues.length === 1) return true;
};

export const validateRadio = (value: string, otherValues: IValidationRadio['size']) => {
  if (!otherValues || Object.keys(otherValues).length === 0) {
    return 'Size is required';
  }
  const selectedValues = Object.values(otherValues).filter((v) => v === value);
  if (selectedValues.length === 1) return true;
};
