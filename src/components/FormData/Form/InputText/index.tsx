import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

type InputText = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const InputText = ({ register, errors }: InputText) => (
  <div className="form__input">
    <label htmlFor="title" className="form__label">
      Title:
    </label>
    <input
      id="title"
      {...register('title', {
        required: {
          value: true,
          message: 'Title is required',
        },
        minLength: {
          value: 5,
          message: 'Title cannot be less than 5 characters',
        },
        maxLength: {
          value: 15,
          message: 'Title cannot exceed 15 characters',
        },
      })}
    />
    {errors.title && (
      <p className="error">
        <>{errors.title?.message}</>
      </p>
    )}
  </div>
);

export default InputText;
