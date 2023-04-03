import React, { FC } from 'react';
import CardListItem from './CardListItem';
import { ISearchCards } from '../../interfaces/searchCard';

import './cardList.scss';

const CardList: FC<ISearchCards> = ({ cards }) => {
  return (
    <div className="cards__list">
      {cards.map((card) => {
        return <CardListItem key={card.id} card={card} />;
      })}
    </div>
  );
};

export default CardList;
