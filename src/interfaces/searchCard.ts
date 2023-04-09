export interface ISearchCard {
  id: number;
  poster_path: string;
  title: string;
}

export interface ISearchCards {
  cards: ISearchCard[];
  setShowModal: (value: boolean) => void;
  setActiveCardId: (value: number) => void;
}

export interface ICardListItem {
  card: ISearchCard;
  setShowModal: (value: boolean) => void;
  setActiveCardId: (value: number) => void;
}
