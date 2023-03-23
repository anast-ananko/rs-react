import React, { Component, createRef, RefObject } from 'react';

import { IFormProps, IFormState } from '../../../interfaces/form';

class Form extends Component<IFormProps, IFormState> {
  inputRef: RefObject<HTMLInputElement>;
  dateRef: RefObject<HTMLInputElement>;
  colorRef: RefObject<HTMLSelectElement>;
  sizeRef_1: RefObject<HTMLInputElement>;
  sizeRef_2: RefObject<HTMLInputElement>;
  sizeRef_3: RefObject<HTMLInputElement>;
  checkboxRef_1: RefObject<HTMLInputElement>;
  checkboxRef_2: RefObject<HTMLInputElement>;
  imageRef: RefObject<HTMLInputElement>;

  constructor(props: IFormProps) {
    super(props);

    this.state = {
      formIsValid: false,
      titleError: '',
      dateError: '',
      colorError: '',
      sizeError: '',
      checkboxError: '',
      imageError: '',
    };

    this.inputRef = createRef<HTMLInputElement>();
    this.dateRef = createRef<HTMLInputElement>();
    this.colorRef = createRef<HTMLSelectElement>();
    this.sizeRef_1 = createRef<HTMLInputElement>();
    this.sizeRef_2 = createRef<HTMLInputElement>();
    this.sizeRef_3 = createRef<HTMLInputElement>();
    this.checkboxRef_1 = createRef<HTMLInputElement>();
    this.checkboxRef_2 = createRef<HTMLInputElement>();
    this.imageRef = createRef<HTMLInputElement>();
  }

  clearFields = () => {
    if (this.inputRef && this.inputRef.current) {
      this.inputRef.current.value = '';
    }
    if (this.dateRef && this.dateRef.current) {
      this.dateRef.current.value = '';
    }
    if (this.colorRef && this.colorRef.current) {
      this.colorRef.current.value = '';
    }
    if (this.sizeRef_1 && this.sizeRef_1.current) {
      this.sizeRef_1.current.value = '';
    }
    if (this.sizeRef_2 && this.sizeRef_2.current) {
      this.sizeRef_2.current.value = '';
    }
    if (this.sizeRef_3 && this.sizeRef_3.current) {
      this.sizeRef_3.current.value = '';
    }
    if (this.checkboxRef_1 && this.checkboxRef_1.current) {
      this.checkboxRef_1.current.value = '';
    }
    if (this.checkboxRef_2 && this.checkboxRef_2.current) {
      this.checkboxRef_2.current.value = '';
    }
    if (this.imageRef && this.imageRef.current) {
      this.imageRef.current.value = '';
    }
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newCard = {
      title: this.inputRef.current!.value,
      date: this.dateRef.current!.value,
      color: this.colorRef.current!.value,
      size: this.sizeRef_1.current!.checked
        ? this.sizeRef_1.current!.value
        : this.sizeRef_2.current!.checked
        ? this.sizeRef_2.current!.value
        : this.sizeRef_3.current!.value,
      checkbox:
        (this.checkboxRef_1.current?.checked ? this.checkboxRef_1.current?.value : '') +
        ' ' +
        (this.checkboxRef_2.current?.checked ? this.checkboxRef_2.current?.value : ''),
      image: URL.createObjectURL(this.imageRef!.current!.files![0]),
    };
    this.props.addCard(newCard);
    this.clearFields();
  };

  render() {
    return (
      <div className="form">
        <form className="form__content" onSubmit={this.handleSubmit}>
          <div className="form__input">
            <label htmlFor="form__input" className="form__label">
              Title:
            </label>
            <input type="text" id="form__input" ref={this.inputRef} />
          </div>
          <div className="form__date">
            <label htmlFor="form__date" className="form__label">
              Date of sale:
            </label>
            <input type="date" id="form__date" ref={this.dateRef} />
          </div>
          <div className="form__select">
            <label htmlFor="form__select" className="form__label">
              Choose color:
            </label>
            <select id="form__select" ref={this.colorRef}>
              <option value="empty">Red</option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="pink">Pink</option>
              <option value="blue">Blue</option>
            </select>
          </div>
          <fieldset className="radio">
            <legend className="legend">Size:</legend>
            <div className="form__radio-item">
              <input
                type="radio"
                id="form__radio-1"
                className="form__radio"
                value="small"
                name="size"
                ref={this.sizeRef_1}
              />
              <label htmlFor="form__radio-1">Small</label>
            </div>
            <div className="form__radio-item">
              <input
                type="radio"
                id="form__radio-2"
                className="form__radio"
                value="medium"
                name="size"
                ref={this.sizeRef_2}
              />
              <label htmlFor="form__radio-2">Medium</label>
            </div>
            <div className="form__radio-item">
              <input
                type="radio"
                className="form__radio"
                id="form__radio-3"
                value="big"
                name="size"
                ref={this.sizeRef_3}
              />
              <label htmlFor="form__radio-3">Big</label>
            </div>
          </fieldset>
          <fieldset className="form__checkbox">
            <legend className="legend">Gift:</legend>
            <div className="form__checkbox-item">
              <input
                type="checkbox"
                name="gift"
                id="postcard"
                value="postcard"
                ref={this.checkboxRef_1}
              />
              <label htmlFor="postcard">Postcard</label>
            </div>
            <div className="form__checkbox-item">
              <input
                type="checkbox"
                name="gift"
                id="trinket"
                value="trinket"
                ref={this.checkboxRef_2}
              />
              <label htmlFor="trinket">Trinket</label>
            </div>
          </fieldset>
          <div className="form__file">
            <label htmlFor="form__file">Choose image: </label>
            <input id="form__file" type="file" name="file" ref={this.imageRef} />
          </div>
          <button type="submit" className="form__button">
            Add card
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
