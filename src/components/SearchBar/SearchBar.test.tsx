import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';

import SearchBar from '.';
import createStore from '../../store';

const store = createStore();

vi.mock('../../../hook');

describe('SearchBar', () => {
  const query = 'test';

  const useAppSelector = vi.fn();
  const useAppDispatch = vi.fn();

  useAppSelector.mockReturnValue({ home: { query } });
  useAppDispatch.mockResolvedValue(vi.fn());

  const inputQuery = 'test';
  const setInputQuery = vi.fn();
  const handleSubmit = vi.fn();

  it('should render input and button', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar
          inputQuery={inputQuery}
          setInputQuery={setInputQuery}
          handleSubmit={handleSubmit}
        />
      </Provider>
    );

    expect(getByTestId('search__button')).toBeInTheDocument();
    expect(getByTestId('form')).toContainElement(getByTestId('search__button'));
    expect(getByTestId('form')).toContainElement(getByPlaceholderText(/search.../i));
  });

  it('should call handleSubmit function when form is submitted', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchBar
          inputQuery={inputQuery}
          setInputQuery={setInputQuery}
          handleSubmit={handleSubmit}
        />
      </Provider>
    );

    const form = getByTestId('form');
    fireEvent.submit(form);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should update the query state when input is changed', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar
          inputQuery={inputQuery}
          setInputQuery={setInputQuery}
          handleSubmit={handleSubmit}
        />
      </Provider>
    );

    const input = getByPlaceholderText(/search.../i);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });
});
