import React from 'react';

import { IInput } from '../../../../interfaces/input';

const InputFile = ({ register, errors }: Pick<IInput, 'register' | 'errors'>) => {
  return (
    <div className="form__file">
      <label htmlFor="file">Image: </label>
      <input
        type="file"
        id="file"
        {...register('image', {
          required: {
            value: true,
            message: 'Image is required',
          },
          validate: {
            value: (value) => {
              if (value) {
                const file = value[0];
                const allowedTypes = ['image/jpeg', 'image/png'];
                if (allowedTypes.includes(file.type)) {
                  return true;
                }
                return 'Invalid file format';
              }
            },
          },
        })}
      />
      {errors.image && (
        <p className="error">
          <>{errors.image?.message}</>
        </p>
      )}
    </div>
  );
};

export default InputFile;
