import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

type InputText = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const InputDate = ({ register, errors }: InputText) => (
  <div className="form__date">
    <label htmlFor="date" className="form__label">
      Date of sale:
    </label>
    <input
      type="date"
      id="date"
      {...register('date', {
        required: {
          value: true,
          message: 'Date is required',
        },
        validate: {
          value: (value) =>
            Date.parse(value) <= Date.now() || 'Date cannot be greater than current',
        },
      })}
    />
    {errors.date && (
      <p className="error">
        <>{errors.date?.message}</>
      </p>
    )}
  </div>
);

export default InputDate;
