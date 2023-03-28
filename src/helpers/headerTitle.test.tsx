import React from 'react';
import { render } from '@testing-library/react';

import { headerTitle } from './getHeaderTitle';

describe('headerTitle', () => {
  it('should return correct title for home page', () => {
    window.history.pushState({}, '', '/');
    const { getByText } = render(<div>{headerTitle()}</div>);
    expect(getByText(/home page/i)).toBeInTheDocument();
  });

  it('should return correct title for about page', () => {
    window.history.pushState({}, '', '/about');
    const { getByText } = render(<div>{headerTitle()}</div>);
    expect(getByText(/about page/i)).toBeInTheDocument();
  });

  it('should return correct title for form page', () => {
    window.history.pushState({}, '', '/form');
    const { getByText } = render(<div>{headerTitle()}</div>);
    expect(getByText(/form page/i)).toBeInTheDocument();
  });

  it('should return correct title for not found page', () => {
    window.history.pushState({}, '', '/404');
    const { getByText } = render(<div>{headerTitle()}</div>);
    expect(getByText(/not found page/i)).toBeInTheDocument();
  });
});
