export interface ISearchBar {
  query: string;
  setQuery: (query: string) => void;
  getCards: (query: string) => void;
}
