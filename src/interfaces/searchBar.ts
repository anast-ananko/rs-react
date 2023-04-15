export interface ISearchBar {
  inputQuery: string;
  setInputQuery: (query: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
