import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors, UseFormGetValues } from 'react-hook-form';

type InputText = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  getValues: UseFormGetValues<FieldValues>;
};

interface FormData {
  gift: string;
}

const checkboxOptions = [
  { label: 'Postcard', value: 'postcard' },
  { label: 'Trinket', value: 'trinket' },
];

const validateCheckbox = (value: string, otherValues: FormData['gift']) => {
  if (!otherValues || Object.keys(otherValues).length === 0) {
    return 'Gift is required';
  }
  const selectedValues = Object.values(otherValues).filter((v) => v === value);
  if (selectedValues.length === 1) return true;
};

const InputCheckbox = ({ register, errors, getValues }: InputText) => (
  <fieldset className="form__checkbox">
    <legend className="legend">Gift:</legend>
    {checkboxOptions.map((option) => (
      <div key={option.value} className="form__checkbox-item">
        <input
          type="checkbox"
          id={option.value}
          value={option.value}
          {...register('gift', {
            validate: (value) => validateCheckbox(value, getValues('gift')),
          })}
        />
        <label htmlFor={option.value}>{option.label}</label>
      </div>
    ))}
    {errors.gift && (
      <p className="error">
        <>{errors.gift?.message}</>
      </p>
    )}
  </fieldset>
);

export default InputCheckbox;
