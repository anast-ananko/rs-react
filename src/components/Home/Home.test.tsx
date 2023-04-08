import React from 'react';
import { render, cleanup, waitFor, act, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Home from '.';
import useFetch from '../../hooks/fetch';
import { IResponce } from '../../interfaces/responce';

describe('Home', () => {
  const server = setupServer(
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
      } else if (query === 'wrong') {
        return res(ctx.status(200), ctx.json(null));
      }
    })
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });

  let data: IResponce;

  it('fetch data and no responce', async () => {
    const { result, rerender } = renderHook(() => useFetch());
    render(<Home />);

    await act(async () => {
      data = await result.current.request(
        `https://api.themoviedb.org/3/search/movie?${new URLSearchParams({
          query: 'wrong',
        })}`
      );
      rerender();
    });

    expect(data).toBeNull;
  });

  it('renders error message when search query fails', async () => {
    const { getByPlaceholderText, getByTestId } = render(<Home />);
    const wrongQuery = 'wrong';

    await userEvent.type(getByPlaceholderText(/search.../i), wrongQuery);
    userEvent.click(getByTestId('search__button'));

    const errorIndicator = getByTestId('home__error');
    await waitFor(() => expect(errorIndicator).toBeInTheDocument());
  });
});
