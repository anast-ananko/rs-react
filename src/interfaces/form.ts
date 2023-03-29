import { ICard } from './card';

export interface IForm {
  addCard: (card: ICard) => void;
}
