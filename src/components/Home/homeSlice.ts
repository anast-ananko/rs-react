import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import usefetch from '../../hooks/fetch';
import { ISearchCard } from '../../interfaces/searchCard';
import { IModalCard } from '../../interfaces/modalCard';
import { IResponce } from '../../interfaces/responce';

interface IHomeState {
  cards: ISearchCard[];
  cardsLoadingStatus: 'idle' | 'loading' | 'error';
  query: string;
  card: IModalCard | undefined;
  cardLoadingStatus: 'idle' | 'loading' | 'error';
}

const initialState: IHomeState = {
  cards: [],
  cardsLoadingStatus: 'idle',
  query: '',
  card: undefined,
  cardLoadingStatus: 'idle',
};

export const fetchAllCards = createAsyncThunk<IResponce, undefined>(
  'home/fetchAllCards',
  async () => {
    const { request } = usefetch();
    return request(
      'https://api.themoviedb.org/3/movie/popular?api_key=44a088ecb314cffa890360d57d5748b9&page=1'
    );
  }
);

export const fetchCardsWithQuery = createAsyncThunk<IResponce, string>(
  'home/fetchCardsWithQuery',
  (query: string) => {
    const { request } = usefetch();
    return request(
      `https://api.themoviedb.org/3/search/movie?api_key=44a088ecb314cffa890360d57d5748b9&page=1&query=${query}`
    );
  }
);

export const fetchCardById = createAsyncThunk<IModalCard, number>(
  'home/fetchCardById',
  (id: number) => {
    const { request } = usefetch();
    return request(
      `https://api.themoviedb.org/3/movie/${id}?api_key=44a088ecb314cffa890360d57d5748b9`
    );
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    valueSetted: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCards.pending, (state) => {
        state.cardsLoadingStatus = 'loading';
        state.cards = [];
      })
      .addCase(fetchAllCards.fulfilled, (state, action) => {
        state.cardsLoadingStatus = 'idle';
        state.cards = action.payload.results;
      })
      .addCase(fetchAllCards.rejected, (state) => {
        state.cardsLoadingStatus = 'error';
      })
      .addCase(fetchCardsWithQuery.pending, (state) => {
        state.cardsLoadingStatus = 'loading';
        state.cards = [];
      })
      .addCase(fetchCardsWithQuery.fulfilled, (state, action) => {
        state.cardsLoadingStatus = 'idle';
        state.cards = action.payload.results;
      })
      .addCase(fetchCardsWithQuery.rejected, (state) => {
        state.cardsLoadingStatus = 'error';
      })
      .addCase(fetchCardById.pending, (state) => {
        state.cardLoadingStatus = 'loading';
        state.card = undefined;
      })
      .addCase(fetchCardById.fulfilled, (state, action) => {
        state.cardLoadingStatus = 'idle';
        state.card = action.payload;
      })
      .addCase(fetchCardById.rejected, (state) => {
        state.cardLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = homeSlice;

export default reducer;
export const { valueSetted } = actions;
