import { configureStore } from '@reduxjs/toolkit';

import homeReducer from '../components/Home/homeSlice';
import formReducer from '../components/FormData/formSlice';

const store = configureStore({
  reducer: { home: homeReducer, form: formReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
