import React from 'react';

import { IInput } from '../../../../interfaces/input';

const InputDate = ({ register, errors }: Pick<IInput, 'register' | 'errors'>) => (
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
