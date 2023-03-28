import React, { FC } from 'react';
import CardListItem from './CardListItem';
import { IFlowers } from 'interfaces/flowers';

import './cardList.scss';

const CardList: FC<IFlowers> = ({ flowers }) => {
  return (
    <div className="cards__list">
      {flowers.map((flower) => {
        return (
          <CardListItem
            key={flower.id}
            id={flower.id}
            name={flower.name}
            latinName={flower.latinName}
            image={flower.image}
          />
        );
      })}
    </div>
  );
};

export default CardList;
