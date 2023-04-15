import React from 'react';

import { useAppDispatch } from '../../../../hook';
import { changeColor } from '../../formSlice';
import { IInput } from '../../../../interfaces/input';

const Select = ({ register, errors }: Pick<IInput, 'register' | 'errors'>) => {
  const dispatch = useAppDispatch();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(changeColor(event.target.value));
  };

  return (
    <div className="form__select">
      <label htmlFor="color" className="form__label">
        Color:
      </label>
      <select
        id="color"
        data-testid="color"
        {...register('color', {
          required: 'Color is required',
        })}
        defaultValue=""
        onChange={handleSelectChange}
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
};

export default Select;
