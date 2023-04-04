import React, { FC } from 'react';
import { ICardListItem } from '../../../interfaces/searchCard';
import noImage from '../../../assets/No_Image_Available.jpg';

const CardListItem: FC<ICardListItem> = ({ card }) => {
  return (
    <div data-testid="card" className="card" key={card.id}>
      <div className="card__image">
        <img
          src={card.poster_path ? `https://image.tmdb.org/t/p/w300/${card.poster_path}` : noImage}
          alt=""
          className="card__img"
        />
      </div>
      <h2 className="card__name">{card.title}</h2>
    </div>
  );
};

export default CardListItem;
