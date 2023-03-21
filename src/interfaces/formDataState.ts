export interface ICard {
  title: string;
  date?: string;
  color?: string;
  size?: string;
  checkbox?: boolean;
  image?: string;
}

export interface IFormDataState {
  cards: ICard[];
}
