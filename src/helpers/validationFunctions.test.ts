import { validateCheckbox, validateRadio } from './validationFunctions';

describe('validateCheckbox', () => {
  it('returns error message when gift is not selected', () => {
    const result = validateCheckbox([]);
    expect(result).toBe('Gift is required');
  });

  it('returns true when gift is selected', () => {
    const result = validateCheckbox(['postcard']);
    expect(result).toBe(true);
  });
});

describe('validateRadio', () => {
  it('returns error message when size is not selected', () => {
    const result = validateRadio('');
    expect(result).toBe('Size is required');
  });

  it('returns true when size is selected', () => {
    const result = validateRadio('small');
    expect(result).toBe(true);
  });
});
