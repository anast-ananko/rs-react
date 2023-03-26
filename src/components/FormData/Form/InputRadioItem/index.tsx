import React, { forwardRef } from 'react';

import { IInputItemProps } from '../../../../interfaces/inputItemProps';

const InputRadioItem = forwardRef<HTMLInputElement, IInputItemProps>((props, ref) => {
  return (
    <div className="form__radio-item">
      <input
        type="radio"
        className="form__radio"
        id={`form__radio-${props.index + 1}`}
        value={props.name}
        name="size"
        ref={ref}
      />
      <label htmlFor={`form__radio-${props.index + 1}`}>{props.name}</label>
    </div>
  );
});

export default InputRadioItem;
