import React, { forwardRef } from 'react';

import { IInputProps } from '../../../../interfaces/inputProps';

const InputFile = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return (
    <div className="form__file">
      <label htmlFor="form__file">Image: </label>
      <input id="form__file" type="file" name="file" ref={ref} />
      {props.state.fileError ? <div className="error">{props.state.fileError}</div> : null}
    </div>
  );
});

export default InputFile;
