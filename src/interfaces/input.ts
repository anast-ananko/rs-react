import { UseFormRegister, FieldErrors, UseFormGetValues } from 'react-hook-form';

import { IFormData } from './formData';

export interface IInput {
  register: UseFormRegister<IFormData>;
  errors: FieldErrors;
  getValues: UseFormGetValues<IFormData>;
}
