import React, { FC } from 'react';

import CardListItem from './CardListItem';
import { ISearchCards } from '../../interfaces/searchCard';
import { useAppSelector } from '../../hook';

import './cardList.scss';

const CardList: FC<ISearchCards> = ({ setShowModal, setActiveCardId }) => {
  const { cards } = useAppSelector((state) => state.home);

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
