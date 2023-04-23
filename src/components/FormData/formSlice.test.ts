import formReducer, {
  addCard,
  clearAllFields,
  changeTitle,
  changeDate,
  changeColor,
  changeSize,
  changeGift,
} from './formSlice';

const card = {
  title: 'Title',
  date: '2022-01-01',
  color: 'red',
  size: 'small',
  gift: 'postcard',
  image: 'image.png',
};

const form = {
  cards: [],
  title: '',
  date: '',
  color: '',
  size: '',
  gift: [],
};

const formWithFilledFields = {
  cards: [],
  title: 'Title',
  date: '2022-01-01',
  color: 'red',
  size: 'small',
  gift: ['postcard'],
};

describe('formSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = formReducer(undefined, { type: '' });

    expect(result).toEqual(form);
  });

  it('should add new card with "addCard" action', () => {
    const action = { type: addCard.type, payload: card };
    const result = formReducer(undefined, action);

    expect(result.cards).toEqual([card]);
    expect(result.cards).toHaveLength(1);
  });

  it('should change title with "changeTitle" action', () => {
    const action = { type: changeTitle.type, payload: 'Title' };
    const result = formReducer(undefined, action);

    expect(result.title).toBe('Title');
  });

  it('should change title with "changeDate" action', () => {
    const action = { type: changeDate.type, payload: '2022-01-01' };
    const result = formReducer(undefined, action);

    expect(result.date).toBe('2022-01-01');
  });

  it('should change title with "changeColor" action', () => {
    const action = { type: changeColor.type, payload: 'red' };
    const result = formReducer(undefined, action);

    expect(result.color).toBe('red');
  });

  it('should change title with "changeSize" action', () => {
    const action = { type: changeSize.type, payload: 'small' };
    const result = formReducer(undefined, action);

    expect(result.size).toBe('small');
  });

  it('should change title with "changeGift" action', () => {
    const action = { type: changeGift.type, payload: 'postcard' };
    const result = formReducer(undefined, action);

    expect(result.gift).toEqual(['postcard']);
  });

  it('should clear all fields with "clearAllFields" action', () => {
    const action = { type: clearAllFields.type };
    const result = formReducer(formWithFilledFields, action);

    expect(result).toEqual(form);
  });
});
