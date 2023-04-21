import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';
import { Provider } from 'react-redux';

import App from './App';
import createStore from './store';
import Page from './Page';
import { IAssetMap } from './interfaces/assetMap';
import { fetchAllCards } from './components/Home/homeSlice';
import usefetch from './hooks/fetch';
import { setCards } from './components/Home/homeSlice';
import { IResponce } from './interfaces/responce';
import homeReducer from './components/Home/homeSlice';

const getData = async () => {
  const { request } = usefetch();
  const data = await request(
    'https://api.themoviedb.org/3/movie/popular?api_key=44a088ecb314cffa890360d57d5748b9&page=1'
  );
  return data;
};

export function render(url: string, assetMap: IAssetMap, opts: RenderToPipeableStreamOptions) {
  const store = createStore({});
  const preloadedState = store.getState();

  const stream = renderToPipeableStream(
    <Page styles={assetMap.styles} preloadedState={preloadedState}>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </Page>,
    opts
  );
  return stream;
}
