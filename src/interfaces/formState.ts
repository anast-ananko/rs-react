import { ICard } from './card';

export interface IFormState {
  cards: ICard[];
  title: string;
  date: string;
  color: string;
  size: string;
  gift: string[];
}
