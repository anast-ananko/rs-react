import React, { Component } from 'react';
import { ICardListItemProps } from '../../../interfaces/cardListItemProps';

class CardListItem extends Component<ICardListItemProps> {
  render() {
    const { id, name, latinName, image } = this.props;

    return (
      <div data-testid="card" className="card" key={id}>
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
