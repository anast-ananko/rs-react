import React from 'react';

import { validateCheckbox } from '../../../../helpers/validationFunctions';
import { IInput } from '../../../../interfaces/input';
import { checkboxOptions } from '../../../../data/checkboxOptions';
import { useAppDispatch } from '../../../../hook';
import { changeGift } from '../../formSlice';

const InputCheckbox = ({ register, errors, getValues }: IInput) => {
  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeGift(event.target.value));
  };

  return (
    <fieldset className="form__checkbox">
      <legend className="legend">Gift:</legend>
      {checkboxOptions.map((option) => (
        <div key={option.value} className="form__checkbox-item">
          <input
            type="checkbox"
            id={option.value}
            value={option.value}
            {...register('gift', {
              validate: () => validateCheckbox(getValues('gift')),
            })}
            onChange={handleInputChange}
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
};

export default InputCheckbox;
