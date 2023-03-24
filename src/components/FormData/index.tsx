import React, { Component } from 'react';

import Form from './Form';
import FormCardsList from './FormCardsList';
import { IFormDataState } from '../../interfaces/formDataState';
import { ICard } from '../../interfaces/card';

import './formData.scss';

class FormData extends Component<Record<string, never>, IFormDataState> {
  state = {
    cards: [],
  };

  addCard = (card: ICard) => {
    this.setState({
      cards: [...this.state.cards, card],
    });
  };

  render() {
    return (
      <div className="form-data">
        <h3 className="form-data__title">Form</h3>
        <Form addCard={this.addCard} />
        <FormCardsList cards={this.state.cards} />
      </div>
    );
  }
}

export default FormData;
