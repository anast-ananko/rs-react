import React, { Component } from 'react';

import { IFormDataState } from '../../../interfaces/formDataState';

class FormCardsList extends Component<IFormDataState, Record<string, never>> {
  constructor(props: IFormDataState) {
    super(props);
  }

  render() {
    return (
      <div className="form-cards__list" data-testid="cards-list">
        {this.props.cards &&
          this.props.cards.map((item, index) => (
            <div key={index} className="form-cards__item" data-testid="form-card">
              <img src={item.image} alt={item.title} className="item__image" />
              <div className="item__content">
                <h3 className="item__title">Title: {item.title}</h3>
                <div className="item__date">Date: {item.date}</div>
                <div className="item__color">Color: {item.color}</div>
                <div className="item__size">Size: {item.size}</div>
                <div className="item__text">Gift: {item.checkbox}</div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default FormCardsList;
