import React, { Component } from 'react';

import Form from './Form';
import FormCardsList from './FormCardsList';
import { IFormDataState, ICard } from '../../interfaces/formDataState';

import './formData.scss';

class FormData extends Component<Record<string, never>, IFormDataState> {
  state = {
    cards: [],
  };

  addCard = (card: ICard) => {
    console.log(card);
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
