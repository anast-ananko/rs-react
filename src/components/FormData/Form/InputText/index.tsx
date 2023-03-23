import React, { forwardRef } from 'react';

import { IFormState } from '../../../../interfaces/form';

interface IInputText {
  state: IFormState;
}

const InputText = forwardRef<HTMLInputElement, IInputText>((props, ref) => {
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
