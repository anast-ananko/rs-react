import { vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

import { fetchAllCards, fetchCardsWithQuery, fetchCardById } from './homeSlice';

describe('fetchAllCards', () => {
  beforeAll(() => {
    const fetchMocker = createFetchMock(vi);
    fetchMocker.enableMocks();
  });

  it('dispatches the correct actions on success', async () => {
    const mockResponse = {
      results: [
        { id: 1, title: 'Movie 1', poster_path: '/path/image1' },
        { id: 2, title: 'Movie 2', poster_path: '/path/image2' },
      ],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const dispatch = vi.fn();
    const thunk = fetchAllCards();

    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toEqual(fetchAllCards.pending.type);
    expect(end[0].type).toEqual(fetchAllCards.fulfilled.type);
    expect(end[0].payload).toEqual(mockResponse);
  });

  it('dispatches the correct actions on error', async () => {
    const dispatch = vi.fn();
    const thunk = fetchAllCards();

    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toEqual(fetchAllCards.pending.type);
    expect(end[0].type).toEqual(fetchAllCards.rejected.type);
  });
});

describe('fetchCardsWithQuery', () => {
  beforeAll(() => {
    const fetchMocker = createFetchMock(vi);
    fetchMocker.enableMocks();
  });

  it('dispatches the correct actions on success', async () => {
    const mockResponse = {
      results: [
        { id: 1, title: 'Movie 1', poster_path: '/path/image1' },
        { id: 2, title: 'Movie 2', poster_path: '/path/image2' },
      ],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const dispatch = vi.fn();
    const thunk = fetchCardsWithQuery('title');

    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toEqual(fetchCardsWithQuery.pending.type);
    expect(end[0].type).toEqual(fetchCardsWithQuery.fulfilled.type);
    expect(end[0].payload).toEqual(mockResponse);
  });

  it('dispatches the correct actions on error', async () => {
    const dispatch = vi.fn();
    const thunk = fetchCardsWithQuery('title');

    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toEqual(fetchCardsWithQuery.pending.type);
    expect(end[0].type).toEqual(fetchCardsWithQuery.rejected.type);
  });
});

describe('fetchCardById', () => {
  beforeAll(() => {
    const fetchMocker = createFetchMock(vi);
    fetchMocker.enableMocks();
  });

  it('dispatches the correct actions on success', async () => {
    const mockResponse = {
      id: 1,
      title: 'Movie 1',
      poster_path: '/path/image1',
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const dispatch = vi.fn();
    const thunk = fetchCardById(22);

    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toEqual(fetchCardById.pending.type);
    expect(end[0].type).toEqual(fetchCardById.fulfilled.type);
    expect(end[0].payload).toEqual(mockResponse);
  });

  it('dispatches the correct actions on error', async () => {
    const dispatch = vi.fn();
    const thunk = fetchCardById(22);

    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toEqual(fetchCardById.pending.type);
    expect(end[0].type).toEqual(fetchCardById.rejected.type);
  });
});
