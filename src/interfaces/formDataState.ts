interface ICard {
  title: string;
  description: string;
  date: string;
  selecte: string;
  chechbox: boolean;
  image: string;
}

export interface IFormDataState {
  cards: ICard[];
}
