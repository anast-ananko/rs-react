import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';
import { Provider } from 'react-redux';

import App from './App';
import createStore from './store';
import Page from './Page';
import { fetchAllCards } from './components/Home/homeSlice';

export async function render(url: string, opts: RenderToPipeableStreamOptions) {
  const store = createStore();
  await store.dispatch(fetchAllCards());
  const preloadedState = store.getState();

  const stream = renderToPipeableStream(
    <Page preloadedState={preloadedState}>
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
