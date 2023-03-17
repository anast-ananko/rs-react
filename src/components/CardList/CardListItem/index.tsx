import React, { Component } from 'react';
import { ICardListItem } from '../../../interfaces/cardListItem';

class CardListItem extends Component<ICardListItem> {
  render() {
    const { id, name, latinName, image } = this.props;
    return (
      <div className="card" key={id}>
        <div className="card__image">
          <img src={image} alt={name} className="card__img" />
        </div>
        <div className="card__content">
          <h2 className="card__name">{name}</h2>
          <p className="card__latin-name">{latinName}</p>
        </div>
      </div>
    );
  }
}

export default CardListItem;
