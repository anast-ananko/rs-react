export interface ICard {
  title: string;
  date: string;
  color: string;
  size: string;
  checkbox: string;
  image: string;
}

export interface ICards {
  cards: ICard[];
}
