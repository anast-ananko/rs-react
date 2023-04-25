import { getHeaderTitle } from './getHeaderTitle';

describe('headerTitle', () => {
  it('should return correct title for home page', () => {
    const path = '/';
    const expectedTitle = 'Home page';
    const result = getHeaderTitle(path);
    expect(result).toBe(expectedTitle);
  });

  it('should return correct title for about page', () => {
    const path = '/about';
    const expectedTitle = 'About page';
    const result = getHeaderTitle(path);
    expect(result).toBe(expectedTitle);
  });

  it('should return correct title for form page', () => {
    const path = '/form';
    const expectedTitle = 'Form page';
    const result = getHeaderTitle(path);
    expect(result).toBe(expectedTitle);
  });

  it('should return the correct title for an unknown path', () => {
    const path = '/unknown';
    const expectedTitle = 'Not found page';
    const result = getHeaderTitle(path);
    expect(result).toBe(expectedTitle);
  });
});
