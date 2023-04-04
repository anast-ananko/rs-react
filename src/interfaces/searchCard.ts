export interface ISearchCard {
  id: number;
  poster_path: string;
  title: string;
}

export interface ISearchCards {
  cards: ISearchCard[];
}

export interface ICardListItem {
  card: ISearchCard;
}
