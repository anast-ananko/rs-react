import { ISearchCard } from './searchCard';
import { IModalCard } from './modalCard';

export interface IHomeState {
  cards: ISearchCard[];
  cardsLoadingStatus: 'idle' | 'loading' | 'error';
  query: string;
  card: IModalCard | undefined;
  cardLoadingStatus: 'idle' | 'loading' | 'error';
}
