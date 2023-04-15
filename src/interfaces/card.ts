export interface ICard {
  title: string;
  date: string;
  color: string;
  size: string;
  gift: string;
  image: string;
}

export interface ICards {
  cards: ICard[];
}
