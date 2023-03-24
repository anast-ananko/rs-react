import React, { forwardRef } from 'react';

import { IInputProps } from '../../../../interfaces/inputProps';

const Select = forwardRef<HTMLSelectElement, IInputProps>((props, ref) => {
  return (
    <div className="form__select">
      <label htmlFor="form__select" className="form__label">
        Color:
      </label>
      <select id="form__select" ref={ref}>
        <option value="empty"></option>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="pink">Pink</option>
        <option value="blue">Blue</option>
      </select>
      {props.state.selectError ? <div className="error">{props.state.selectError}</div> : null}
    </div>
  );
});

export default Select;
