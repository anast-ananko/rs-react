import { ICard } from './card';

export interface IFormProps {
  addCard: (card: ICard) => void;
}

export interface IFormState {
  formIsValid: boolean;
  inputError: string;
  dateError: string;
  selectError: string;
  radioError: string;
  checkboxError: string;
  fileError: string;
}
