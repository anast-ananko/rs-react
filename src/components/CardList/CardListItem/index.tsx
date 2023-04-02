import React, { FC } from 'react';
import { ICardListItem } from '../../../interfaces/cardListItem';

const CardListItem: FC<ICardListItem> = ({ id, name, latinName, image }) => {
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
};

export default CardListItem;
