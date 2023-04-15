import React from 'react';
import { renderHook, act, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { afterEach, vi } from 'vitest';

import Modal from '.';
import useFetch from '../../hooks/fetch';
import { IModalCard } from '../../interfaces/modalCard';
import store from '../../store';

vi.mock('../../../hook');

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

  const card = {
    id: 1,
    poster_path: 'https://example.com/image1',
    title: 'Card 1',
    release_date: '01/01/2022',
    genres: ['Comedy'],
    runtime: 120,
    overview: 'Description',
  };

  const cardLoadingStatus = 'loading';

  const useAppSelector = vi.fn();
  const useAppDispatch = vi.fn();

  useAppSelector.mockReturnValue({ card, cardLoadingStatus });
  useAppDispatch.mockResolvedValue(vi.fn());

  let data: IModalCard;

  it('renders the modal when show is true', async () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <Modal {...props} />
      </Provider>
    );

    act(() => {
      expect(queryByTestId('modal')).toBeInTheDocument();
    });
  });

  it('does not render the modal when show is false', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <Modal {...props} showModal={false} />
      </Provider>
    );

    act(() => {
      expect(queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  it('fetches the card and render card with data', async () => {
    const { result, rerender } = renderHook(() => useFetch());
    const { findByText, findByAltText } = render(
      <Provider store={store}>
        <Modal {...props} />
      </Provider>
    );

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
    const { findByText, findByAltText } = render(
      <Provider store={store}>
        <Modal {...props} activeCardId={2} />
      </Provider>
    );

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
    const { getByTestId } = render(
      <Provider store={store}>
        <Modal {...props} />
      </Provider>
    );

    expect(getByTestId('modal')).toBeInTheDocument();
    await userEvent.click(getByTestId('close'));
    expect(props.onClose).toBeCalledTimes(1);
  });
});
