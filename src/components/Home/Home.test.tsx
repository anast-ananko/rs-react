import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Home from '.';
import useFetch from '../../hooks/fetch';

describe('Home', () => {
  const server = setupServer(
    rest.get('https://api.themoviedb.org/3/search/movie?query=Matrix', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          results: [
            { id: 1, title: 'Title-3', poster_path: '/image-3' },
            { id: 2, title: 'Title-4', poster_path: '/image-4' },
          ],
        })
      );
    }),
    rest.get('https://api.themoviedb.org/3/search/movie?query=wrong', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(null));
    })
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it('fetch data and no responce', async () => {
    const { result, rerender } = renderHook(() => useFetch());
    render(<Home />);

    const data = await result.current.request(
      'https://api.themoviedb.org/3/search/movie?query=wrong'
    );
    rerender();

    expect(data).toBeNull;
  });

  it('updates query when input value changes and fetch data', async () => {
    const { result, rerender } = renderHook(() => useFetch());
    const { getByRole } = render(<Home />);
    const searchInput = getByRole('textbox') as HTMLInputElement;
    await userEvent.type(searchInput, 'Matrix');
    expect(searchInput.value).toBe('Matrix');
    const query = searchInput.value;

    const data = await result.current.request(
      `https://api.themoviedb.org/3/search/movie?query=${query}`
    );
    console.log(`https://api.themoviedb.org/3/search/movie?query=${query}`);
    rerender();

    expect(data.results[0].title).toBe('Title-3');
    expect(data.results[1].title).toBe('Title-4');
  });
});
