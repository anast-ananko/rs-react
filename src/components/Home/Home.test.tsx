import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';

import Home from '.';
import createStore from '../../store';

const store = createStore();

describe('Home', () => {
  const server = setupServer(
    rest.get('https://api.themoviedb.org/3/movie/popular', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          results: [
            { id: 1, title: 'Title-1', poster_path: '/image-1' },
            { id: 2, title: 'Title-2', poster_path: '/image-2' },
          ],
        })
      );
    }),
    rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
      const query = req.url.searchParams.get('query');
      if (query === 'Matrix') {
        return res(
          ctx.status(200),
          ctx.json({
            results: [
              { id: 1, title: 'Title-3', poster_path: '/image-3' },
              { id: 2, title: 'Title-4', poster_path: '/image-4' },
            ],
          })
        );
      }
    })
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });

  it('should render Home component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(getByTestId('home')).toBeInTheDocument();
  });

  it('should render Home component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(getByTestId('home')).toBeInTheDocument();
  });
});
