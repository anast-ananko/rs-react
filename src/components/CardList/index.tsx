import React, { Component } from 'react';
import CardListItem from './CardListItem';
import { IFlower } from '../../interfaces/flower';
import { IFlowers } from 'interfaces/flowers';

import './cardList.scss';

class CardList extends Component<IFlowers> {
  render() {
    const { flowers } = this.props;

    return (
      <div className="cards__list">
        {flowers.map((flower: IFlower) => {
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
