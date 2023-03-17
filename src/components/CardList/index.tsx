import React, { Component } from 'react';
import CardListItem from './CardListItem';
import flowers from '../../data/flowers.json';

import './cardList.scss';

class CardList extends Component {
  render() {
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
  }
}

export default CardList;
