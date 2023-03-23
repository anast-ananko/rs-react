import { ICard } from './formDataState';

export interface IFormProps {
  addCard: (card: ICard) => void;
}

export interface IFormState {
  formIsValid: boolean;
  titleError: string;
  dateError: string;
  colorError: string;
  sizeError: string;
  checkboxError: string;
  imageError: string;
}
