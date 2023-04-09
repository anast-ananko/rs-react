import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Home from '.';

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
    const { getByTestId } = render(<Home />);

    expect(getByTestId('home')).toBeInTheDocument();
  });

  it('should render loading spinner', async () => {
    const { getByTestId } = render(<Home />);
    const loadingElement = getByTestId('home-loading');

    expect(loadingElement).toBeInTheDocument();
    await waitFor(() => {
      expect(loadingElement).not.toBeInTheDocument();
    });
  });

  it('should show the list of cards when there is data available', async () => {
    const { getAllByTestId } = render(<Home />);

    await waitFor(() => {
      expect(getAllByTestId('card').length).toBe(2);
    });
  });

  it('should display a list of cards when the search query returns results', async () => {
    const { getByTestId, getAllByTestId, getByPlaceholderText } = render(<Home />);

    fireEvent.change(getByPlaceholderText(/search.../i), { target: { value: 'Matrix' } });
    fireEvent.submit(getByTestId('form'));

    await waitFor(() => {
      const cards = getAllByTestId('card');
      expect(cards).toHaveLength(2);
      expect(cards[0]).toHaveTextContent('Title-3');
      expect(cards[1]).toHaveTextContent('Title-4');
    });
  });
});
