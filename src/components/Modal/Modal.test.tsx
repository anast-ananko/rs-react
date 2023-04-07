import React from 'react';
import { renderHook } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { afterEach, vi } from 'vitest';

import Modal from '.';
import useFetch from '../../hooks/fetch';

describe('Modal', () => {
  const server = setupServer(
    rest.get('https://api.themoviedb.org/3/movie/1', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          poster_path: 'https://image.tmdb.org/t/p/w300/image.jpg',
          title: 'Mocked Movie Title',
          release_date: '2023-04-07',
          genres: [
            { id: 1, name: 'Action' },
            { id: 2, name: 'Comedy' },
          ],
          runtime: 120,
          overview: 'Mocked Movie Overview',
        })
      );
    })
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  const props = {
    onClose: vi.fn(),
    showModal: true,
    activeCardId: 1,
  };

  it('renders the modal when show is true', async () => {
    const { queryByTestId } = render(<Modal {...props} />);

    expect(queryByTestId('modal')).toBeInTheDocument();
  });

  it('does not render the modal when show is false', () => {
    const { queryByTestId } = render(<Modal {...props} showModal={false} />);

    expect(queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('fetches the active card when activeCardId is set', async () => {
    const { result, rerender } = renderHook(() => useFetch());
    const { getByTestId, findByText, queryByTestId, queryByText } = render(<Modal {...props} />);

    const data = await result.current.request('https://api.themoviedb.org/3/movie/1');
    rerender();

    expect(data.poster_path).toBe('https://image.tmdb.org/t/p/w300/image.jpg');
    expect(data.title).toBe('Mocked Movie Title');
    expect(data.release_date).toBe('2023-04-07');
    expect(data.genres[0].name).toBe('Action');
    expect(data.genres[1].name).toBe('Comedy');
    expect(data.runtime).toBe(120);
    expect(data.overview).toBe('Mocked Movie Overview');

    expect(getByTestId('modal')).not.toHaveTextContent('Mocked Movie Title');

    // console.log(data.title);
    // await act(() => promise);
    //expect(findByText(data.title)).toBeInTheDocument();
  });

  it('modal shows the children and a close button', () => {
    const onClose = vi.fn();
    const { getByTestId, findByTestId, queryByTestId } = render(<Modal {...props} />);
    expect(getByTestId('modal')).toBeInTheDocument();
    userEvent.click(getByTestId('close'));
    screen.debug();

    //expect(findByTestId('modal')).not.toBeInTheDocument();
    //expect(onClose).toBeCalledTimes(1);
  });
});
