import homeReducer, { setValue } from './homeSlice';
import { vi } from 'vitest';

global.fetch = vi.fn();

const home = {
  cards: [],
  cardsLoadingStatus: 'idle',
  query: '',
  card: undefined,
  cardLoadingStatus: 'idle',
};

describe('homeSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = homeReducer(undefined, { type: '' });

    expect(result).toEqual(home);
  });

  it('should add new card with "addCard" action', () => {
    const action = { type: setValue.type, payload: 'Funny' };
    const result = homeReducer(undefined, action);

    expect(result.query).toBe('Funny');
  });
});
