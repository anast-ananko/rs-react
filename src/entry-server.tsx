import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

// const context = {};
// const data = await fetch(
//   'https://api.themoviedb.org/3/movie/popular?api_key=44a088ecb314cffa890360d57d5748b9&page=1'
// );
//const data = await fetchDataByUrl(req.url);

//const store = createStore((state) => state, data);

export function render(url: string, opts: RenderToPipeableStreamOptions) {
  const stream = renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>,
    opts
  );
  return stream;
}
