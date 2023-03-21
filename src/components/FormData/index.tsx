import React, { Component } from 'react';

import Form from './Form';
import FormCardsList from './FormCardsList';
import { IFormDataState } from '../../interfaces/formDataState';

import './formData.scss';

class FormData extends Component<Record<string, never>, IFormDataState> {
  state = {
    cards: [],
  };

  render() {
    return (
      <div className="form-data">
        <h3 className="form-data__title">Form</h3>
        <Form />
        <FormCardsList />
      </div>
    );
  }
}

export default FormData;
