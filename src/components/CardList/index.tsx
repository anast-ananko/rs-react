import React, { FC } from 'react';
import CardListItem from './CardListItem';
import { ISearchCards } from '../../interfaces/searchCard';

import './cardList.scss';

const CardList: FC<ISearchCards> = ({ cards, setShowModal, setActiveCardId }) => {
  return (
    <div className="cards__list" data-testid="cards-list">
      {cards.map((card) => {
        return (
          <CardListItem
            key={card.id}
            card={card}
            setShowModal={setShowModal}
            setActiveCardId={setActiveCardId}
          />
        );
      })}
    </div>
  );
};

export default CardList;
