import React, { forwardRef } from 'react';

import { IInputProps } from '../../../../interfaces/inputProps';

const InputDate = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return (
    <div className="form__date">
      <label htmlFor="form__date" className="form__label">
        Date of sale:
      </label>
      <input type="date" id="form__date" ref={ref} name="date" />
      {props.state.dateError ? <div className="error">{props.state.dateError}</div> : null}
    </div>
  );
});

export default InputDate;
