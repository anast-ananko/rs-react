import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

type InputText = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const InputFile = ({ register, errors }: InputText) => (
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
            const file = value[0];
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (allowedTypes.includes(file.type)) {
              return true;
            }
            return 'Invalid file format';
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

export default InputFile;
