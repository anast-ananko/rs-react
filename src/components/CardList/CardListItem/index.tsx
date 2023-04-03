import React, { FC } from 'react';
import { ICardListItem } from '../../../interfaces/searchCard';
import vite from '../../../../public/vite.svg';

const CardListItem: FC<ICardListItem> = ({ card }) => {
  return (
    <div data-testid="card" className="card" key={card.id}>
      <div className="card__image">
        <img
          src={card.poster_path ? `https://image.tmdb.org/t/p/w300/${card.poster_path}` : vite}
          alt=""
          className="card__img"
        />
      </div>
      <div className="card__content">
        <h2 className="card__name"></h2>
        <p className="card__latin-name"></p>
      </div>
    </div>
  );
};

export default CardListItem;
