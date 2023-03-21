import React, { Component, createRef, RefObject } from 'react';

import { IForm } from '../../../interfaces/form';

class Form extends Component<IForm, Record<string, never>> {
  inputRef: RefObject<HTMLInputElement>;
  dateRef: RefObject<HTMLInputElement>;
  colorRef: RefObject<HTMLSelectElement>;
  sizeRef_1: RefObject<HTMLInputElement>;
  sizeRef_2: RefObject<HTMLInputElement>;
  sizeRef_3: RefObject<HTMLInputElement>;
  checkboxRef: RefObject<HTMLInputElement>;
  imageRef: RefObject<HTMLInputElement>;

  constructor(props: IForm) {
    super(props);

    this.inputRef = createRef<HTMLInputElement>();
    this.dateRef = createRef<HTMLInputElement>();
    this.colorRef = createRef<HTMLSelectElement>();
    this.sizeRef_1 = createRef<HTMLInputElement>();
    this.sizeRef_2 = createRef<HTMLInputElement>();
    this.sizeRef_3 = createRef<HTMLInputElement>();
    this.checkboxRef = createRef<HTMLInputElement>();
    this.imageRef = createRef<HTMLInputElement>();
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(this.checkboxRef.current);
    const newCard = {
      title: this.inputRef.current!.value,
      date: this.dateRef.current!.value,
      color: this.colorRef.current!.value,
      size: this.sizeRef_1.current?.checked
        ? this.sizeRef_1.current?.value
        : this.sizeRef_2.current?.checked
        ? this.sizeRef_2.current?.value
        : this.sizeRef_3.current?.value,
      checkbox: this.checkboxRef.current?.checked,
      image: this.imageRef.current!.value,
    };
    this.props.addCard(newCard);
  };

  render() {
    return (
      <div className="form">
        <form className="form__content" onSubmit={this.handleSubmit}>
          <label className="form__label">
            Title: <input type="text" ref={this.inputRef} />
          </label>
          <label className="form__label">
            Date of sale: <input type="date" className="form__date" ref={this.dateRef} />
          </label>
          <label className="form__label">
            Choose color:{' '}
            <select className="form__select" ref={this.colorRef}>
              <option value="Red">Red</option>
              <option value="Orange">Orange</option>
              <option value="Pink">Pink</option>
              <option value="Blue">Blue</option>
            </select>
          </label>
          <label className="form__label">
            Size:
            <fieldset>
              <input
                ref={this.sizeRef_1}
                checked
                type="radio"
                value="Small"
                className="form__radio"
                name="size"
              />{' '}
              Small
              <input
                ref={this.sizeRef_2}
                type="radio"
                value="Medium"
                className="form__radio"
                name="size"
              />{' '}
              Medium
              <input
                ref={this.sizeRef_3}
                type="radio"
                value="Big"
                className="form__radio"
                name="size"
              />{' '}
              Big
            </fieldset>
          </label>
          <label className="form__label">
            <input
              type="checkbox"
              name="checkbox"
              className="form__checkbox"
              ref={this.checkboxRef}
            />
            I agree with the rules
          </label>
          <label>
            Choose image:{' '}
            <input type="file" name="file" className="form__file" ref={this.imageRef} />
          </label>
          <button type="submit" className="form__button">
            Add card
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
