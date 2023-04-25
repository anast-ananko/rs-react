import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';

import homeReducer from '../components/Home/homeSlice';
import formReducer from '../components/FormData/formSlice';

const rootReducer = combineReducers({
  home: homeReducer,
  form: formReducer,
});

const createStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });
};

export default createStore;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
