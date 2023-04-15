import React, { FC } from 'react';

import Form from './Form';
import FormCardsList from './FormCardsList';

import './formData.scss';

const FormData: FC = () => {
  return (
    <div className="form-data">
      <h3 className="form-data__title">Form</h3>
      <Form />
      <FormCardsList />
    </div>
  );
};

export default FormData;
