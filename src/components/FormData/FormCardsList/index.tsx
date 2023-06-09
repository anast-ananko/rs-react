import React, { FC } from 'react';

import { useAppSelector } from '../../../hook';

const FormCardsList: FC = () => {
  const { cards } = useAppSelector((state) => state.form);

  return (
    <div className="form-cards__list" data-testid="cards-list">
      {cards &&
        cards.map((item, index: number) => (
          <div key={index} className="form-cards__item" data-testid="form-card">
            <img src={item.image} alt={item.title} className="item__image" />
            <div className="item__content">
              <h3 className="item__title">Title: {item.title}</h3>
              <div className="item__date">Date: {item.date}</div>
              <div className="item__color">Color: {item.color}</div>
              <div className="item__size">Size: {item.size}</div>
              <div className="item__text">Gift: {item.gift}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FormCardsList;
