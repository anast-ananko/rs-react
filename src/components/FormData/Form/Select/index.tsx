import React from 'react';

import { IInput } from '../../../../interfaces/input';

const Select = ({ register, errors }: Pick<IInput, 'register' | 'errors'>) => (
  <div className="form__select">
    <label htmlFor="color" className="form__label">
      Color:
    </label>
    <select
      id="color"
      {...register('color', {
        required: 'Color is required',
      })}
      defaultValue=""
    >
      <option value=""></option>
      <option value="red">Red</option>
      <option value="orange">Orange</option>
      <option value="pink">Pink</option>
      <option value="blue">Blue</option>
    </select>
    {errors.color && (
      <p className="error">
        <>{errors.color?.message}</>
      </p>
    )}
  </div>
);

export default Select;
