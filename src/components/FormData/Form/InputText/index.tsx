import React from 'react';

import { IInput } from '../../../../interfaces/input';

const InputText = ({ register, errors }: Pick<IInput, 'register' | 'errors'>) => (
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
        validate: {
          value: (value) => value[0] === value[0].toUpperCase() || 'First letter must be uppercase',
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
