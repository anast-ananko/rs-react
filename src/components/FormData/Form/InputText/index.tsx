import React, { forwardRef } from 'react';

import { IInputProps } from '../../../../interfaces/inputProps';

const InputText = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return (
    <div className="form__input">
      <label htmlFor="form__input" className="form__label">
        Title:
      </label>
      <input type="text" id="form__input" ref={ref} />
      {props.state.inputError && <div className="error">{props.state.inputError}</div>}
    </div>
  );
});

export default InputText;
