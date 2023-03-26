import React, { forwardRef } from 'react';

import { IInputItemProps } from '../../../../interfaces/inputItemProps';

const InputCheckboxItem = forwardRef<HTMLInputElement, IInputItemProps>((props, ref) => {
  return (
    <div className="form__checkbox-item">
      <input type="checkbox" name={props.name} id={props.name} value={props.name} ref={ref} />
      <label htmlFor={props.name}>{props.name}</label>
    </div>
  );
});

export default InputCheckboxItem;
