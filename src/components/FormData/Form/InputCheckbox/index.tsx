import React from 'react';

import { validateCheckbox } from '../../../../helpers/validationFunctions';
import { IInput } from '../../../../interfaces/input';
import { checkboxOptions } from '../../../../data/checkboxOptions';

const InputCheckbox = ({ register, errors, getValues }: IInput) => (
  <fieldset className="form__checkbox">
    <legend className="legend">Gift:</legend>
    {checkboxOptions.map((option) => (
      <div key={option.value} className="form__checkbox-item">
        <input
          type="checkbox"
          id={option.value}
          value={option.value}
          {...register('gift', {
            validate: (value) => validateCheckbox(value[0], getValues('gift')[0]),
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
