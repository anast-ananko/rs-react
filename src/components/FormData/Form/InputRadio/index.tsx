import React from 'react';

import { validateRadio } from '../../../../helpers/validationFunctions';
import { IInput } from '../../../../interfaces/input';
import { radioOptions } from '../../../../data/radioOptions';
import { useAppDispatch } from '../../../../hook';
import { changeSize } from '../../formSlice';

const InputRadio = ({ register, errors, getValues }: IInput) => {
  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeSize(event.target.value));
  };

  return (
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
              validate: () => validateRadio(getValues('size')),
            })}
            onChange={handleInputChange}
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
};

export default InputRadio;
