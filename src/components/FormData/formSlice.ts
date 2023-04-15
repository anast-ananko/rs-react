import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICard } from '../../interfaces/card';
import { IFormState } from '../../interfaces/formState';

const initialState: IFormState = {
  cards: [],
  title: '',
  date: '',
  color: '',
  size: '',
  gift: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<ICard>) => {
      state.cards.push(action.payload);
    },
    clearAllFields: (state) => {
      state.title = '';
      state.date = '';
      state.color = '';
      state.size = '';
      state.gift = [];
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    changeDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    changeColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    changeSize: (state, action: PayloadAction<string>) => {
      state.size = action.payload;
    },
    changeGift: (state, action: PayloadAction<string>) => {
      state.gift.push(action.payload);
    },
  },
});

const { actions, reducer } = formSlice;

export default reducer;
export const {
  addCard,
  clearAllFields,
  changeTitle,
  changeDate,
  changeColor,
  changeSize,
  changeGift,
} = actions;
