import React from 'react';
import { renderHook, act, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { afterEach, vi } from 'vitest';

import Modal from '.';
import useFetch from '../../hooks/fetch';
import { IModalCard } from '../../interfaces/modalCard';

describe('Modal', () => {
  const server = setupServer(
    rest.get('https://api.themoviedb.org/3/movie/1', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          poster_path: 'https://image.tmdb.org/t/p/w300/image.jpg',
          title: 'Mocked Movie Title 1',
          release_date: '2023-04-07',
          genres: [
            { id: 1, name: 'Action' },
            { id: 2, name: 'Comedy' },
          ],
          runtime: 120,
          overview: 'Mocked Movie Overview',
        })
      );
    }),
    rest.get('https://api.themoviedb.org/3/movie/2', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          poster_path: '',
          title: 'Mocked Movie Title 2',
          release_date: '2023-04-07',
          genres: [
            { id: 1, name: 'Action' },
            { id: 2, name: 'Comedy' },
          ],
          runtime: null,
          overview: 'Mocked Movie Overview',
        })
      );
    })
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });

  const props = {
    onClose: vi.fn(),
    showModal: true,
    activeCardId: 1,
  };

  let data: IModalCard;

  it('renders the modal when show is true', async () => {
    const { queryByTestId } = render(<Modal {...props} />);

    act(() => {
      expect(queryByTestId('modal')).toBeInTheDocument();
    });
  });

  it('does not render the modal when show is false', () => {
    const { queryByTestId } = render(<Modal {...props} showModal={false} />);

    act(() => {
      expect(queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  it('fetches the card and render card with data', async () => {
    const { result, rerender } = renderHook(() => useFetch());
    const { findByText, findByAltText } = render(<Modal {...props} />);

    await act(async () => {
      data = await result.current.request('https://api.themoviedb.org/3/movie/1');
      rerender();
    });

    expect(data.poster_path).toBe('https://image.tmdb.org/t/p/w300/image.jpg');
    expect(data.title).toBe('Mocked Movie Title 1');
    expect(data.release_date).toBe('2023-04-07');
    expect(data.genres[0].name).toBe('Action');
    expect(data.genres[1].name).toBe('Comedy');
    expect(data.runtime).toBe(120);
    expect(data.overview).toBe('Mocked Movie Overview');

    expect(await findByText(data.title)).toBeInTheDocument();
    expect(await findByAltText(data.title)).toBeInTheDocument();
    expect(await findByText(/2023/)).toBeInTheDocument();
    expect(await findByText(/action/i)).toBeInTheDocument();
    expect(await findByText(/comedy/i)).toBeInTheDocument();
    expect(await findByText(data.overview)).toBeInTheDocument();
  });

  it('fetches the card and render card with data, no image and no duration', async () => {
    cleanup();
    const { result, rerender } = renderHook(() => useFetch());
    const { findByText, findByAltText } = render(<Modal {...props} activeCardId={2} />);

    await act(async () => {
      data = await result.current.request('https://api.themoviedb.org/3/movie/2');
      rerender();
    });

    expect(data.poster_path).toBe('');
    expect(data.title).toBe('Mocked Movie Title 2');
    expect(data.release_date).toBe('2023-04-07');
    expect(data.genres[0].name).toBe('Action');
    expect(data.genres[1].name).toBe('Comedy');
    expect(data.runtime).toBeNull;
    expect(data.overview).toBe('Mocked Movie Overview');

    expect(await findByText(data.title)).toBeInTheDocument();
    expect(await findByAltText('noImage')).toBeInTheDocument();
    expect(await findByText(/2023/)).toBeInTheDocument();
    expect(await findByText(/action/i)).toBeInTheDocument();
    expect(await findByText(/comedy/i)).toBeInTheDocument();
    expect(await findByText(/-/i)).toBeInTheDocument();
    expect(await findByText(data.overview)).toBeInTheDocument();
  });

  it('modal shows the children and a close button', async () => {
    const { getByTestId } = render(<Modal {...props} />);

    expect(getByTestId('modal')).toBeInTheDocument();
    await userEvent.click(getByTestId('close'));
    expect(props.onClose).toBeCalledTimes(1);
  });
});
