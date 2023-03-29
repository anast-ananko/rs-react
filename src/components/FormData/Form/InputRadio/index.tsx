import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors, UseFormGetValues } from 'react-hook-form';

type InputText = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  getValues: UseFormGetValues<FieldValues>;
};

interface FormData {
  size: string;
}

const radioOptions = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Big', value: 'big' },
];

const validateSize = (value: string, otherValues: FormData['size']) => {
  if (!otherValues || Object.keys(otherValues).length === 0) {
    return 'Size is required';
  }
  const selectedValues = Object.values(otherValues).filter((v) => v === value);
  if (selectedValues.length === 1) return true;
};

const InputRadio = ({ register, errors, getValues }: InputText) => (
  <fieldset className="radio">
    <legend className="legend">Size:</legend>
    {radioOptions.map((option) => (
      <div key={option.value} className="form__radio-item">
        <input
          type="radio"
          className="form__radio"
          value={option.value}
          id={option.value}
          {...register('size', {
            validate: (value) => validateSize(value, getValues('size')),
          })}
        />
        <label htmlFor={option.value}>{option.label}</label>
      </div>
    ))}
    {errors.size && (
      <p className="error">
        <>{errors.size?.message}</>
      </p>
    )}
  </fieldset>
);

export default InputRadio;
