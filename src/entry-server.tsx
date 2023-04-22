import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';
import { Provider } from 'react-redux';

import App from './App';
import createStore from './store';
import Page from './Page';
import { IAssetMap } from './interfaces/assetMap';

export function render(url: string, assetMap: IAssetMap, opts: RenderToPipeableStreamOptions) {
  const store = createStore();
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
