export interface ISearchBar {
  query: string;
  setQuery: (query: string) => void;
  getCards: () => void;
}
