import { renderHook, act } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { afterEach } from 'vitest';

import { IResponce } from '../interfaces/responce';
import useFetch from './fetch';

describe('UseFetch', () => {
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
    rest.get('https://api.themoviedb.org/3/movie/popular/wrong', (req, res, ctx) => {
      return res(ctx.status(404));
    })
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  let data: IResponce;

  it('initial data state is loading and no error', async () => {
    const { result } = renderHook(() => useFetch());

    await act(async () => {
      expect(result.current.isLoading).toBe(true);
      expect(result.current.error).toBe('');
    });
  });

  it('data is fetched and not loading, no error', async () => {
    const { result, rerender } = renderHook(() => useFetch());

    await act(async () => {
      data = await result.current.request('https://api.themoviedb.org/3/movie/popular');
      rerender();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('');
    expect(data.results[0].title).toBe('Title-1');
    expect(data.results[1].title).toBe('Title-2');
  });

  it('data is not fetched and not loading, error', async () => {
    const { result, rerender } = renderHook(() => useFetch());

    await act(async () => {
      await result.current.request('https://api.themoviedb.org/3/movie/popular/wrong');
      rerender();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch');
  });
});
