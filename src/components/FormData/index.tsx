import React, { FC, useState } from 'react';

import Form from './Form';
import FormCardsList from './FormCardsList';
import { ICard } from '../../interfaces/card';

import './formData.scss';

const FormData: FC = () => {
  const [cards, setCards] = useState<ICard[]>([]);

  const addCard = (card: ICard): void => {
    setCards([...cards, card]);
  };

  return (
    <div className="form-data">
      <h3 className="form-data__title">Form</h3>
      <Form addCard={addCard} />
      <FormCardsList cards={cards} />
    </div>
  );
};

export default FormData;
