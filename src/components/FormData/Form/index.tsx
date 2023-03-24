import React, { Component, createRef, RefObject } from 'react';

import { IFormProps, IFormState } from '../../../interfaces/form';
import InputText from './InputText';

class Form extends Component<IFormProps, IFormState> {
  formRef: RefObject<HTMLFormElement>;
  inputRef: RefObject<HTMLInputElement>;
  dateRef: RefObject<HTMLInputElement>;
  selectRef: RefObject<HTMLSelectElement>;
  radioRef_1: RefObject<HTMLInputElement>;
  radioRef_2: RefObject<HTMLInputElement>;
  radioRef_3: RefObject<HTMLInputElement>;
  checkboxRef_1: RefObject<HTMLInputElement>;
  checkboxRef_2: RefObject<HTMLInputElement>;
  fileRef: RefObject<HTMLInputElement>;

  constructor(props: IFormProps) {
    super(props);

    this.state = {
      formIsValid: false,
      inputError: '',
      dateError: '',
      selectError: '',
      radioError: '',
      checkboxError: '',
      fileError: '',
    };

    this.formRef = createRef<HTMLFormElement>();
    this.inputRef = createRef<HTMLInputElement>();
    this.dateRef = createRef<HTMLInputElement>();
    this.selectRef = createRef<HTMLSelectElement>();
    this.radioRef_1 = createRef<HTMLInputElement>();
    this.radioRef_2 = createRef<HTMLInputElement>();
    this.radioRef_3 = createRef<HTMLInputElement>();
    this.checkboxRef_1 = createRef<HTMLInputElement>();
    this.checkboxRef_2 = createRef<HTMLInputElement>();
    this.fileRef = createRef<HTMLInputElement>();
  }

  clearFields = () => {
    this.formRef.current?.reset();
  };

  validateInput = () => {
    const re = /[а-яА-ЯёЁa-zA-Z\d]{5,}/;

    if (!re.test(this.inputRef.current!.value)) {
      this.setState({
        inputError: 'Error: minimum length is 5 characters',
      });
      return false;
    } else {
      this.setState({
        inputError: '',
      });
      return true;
    }
  };

  validateDate = () => {
    if (!this.dateRef.current!.value) {
      this.setState({
        dateError: 'Error: required field',
      });
      return false;
    } else if (+Date.now() - +new Date(this.dateRef.current!.value) < 0) {
      this.setState({
        dateError: 'Error: date cannot be greater than current',
      });
      return false;
    } else {
      this.setState({
        dateError: '',
      });
      return true;
    }
  };

  validateSelect = () => {
    if (this.selectRef.current!.value === 'empty') {
      this.setState({
        selectError: 'Error: required field',
      });
      return false;
    } else {
      this.setState({
        selectError: '',
      });
      return true;
    }
  };

  validateRadio = () => {
    if (
      !this.radioRef_1.current!.checked &&
      !this.radioRef_2.current!.checked &&
      !this.radioRef_3.current!.checked
    ) {
      this.setState({
        radioError: 'Error: required field',
      });
      return false;
    } else {
      this.setState({
        radioError: '',
      });
      return true;
    }
  };

  validateCheckbox = () => {
    if (!this.checkboxRef_1.current!.checked && !this.checkboxRef_2.current!.checked) {
      this.setState({
        checkboxError: 'Error: required field',
      });
      return false;
    } else {
      this.setState({
        checkboxError: '',
      });
      return true;
    }
  };

  validateFile = () => {
    if (!this.fileRef.current!.value) {
      this.setState({
        fileError: 'Error: required field',
      });
      return false;
    } else {
      this.setState({
        fileError: '',
      });
      return true;
    }
  };

  validateForm = () => {
    const validationResults = {
      input: this.validateInput(),
      date: this.validateDate(),
      select: this.validateSelect(),
      radio: this.validateRadio(),
      checkbox: this.validateCheckbox(),
      file: this.validateFile(),
    };

    const isFormValid = Object.values(validationResults).every((result) => result);

    this.setState({
      formIsValid: isFormValid,
    });

    return isFormValid;
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.validateForm()) {
      const newCard = {
        title: this.inputRef.current!.value,
        date: this.dateRef.current!.value,
        color: this.selectRef.current!.value,
        size: this.radioRef_1.current!.checked
          ? this.radioRef_1.current!.value
          : this.radioRef_2.current!.checked
          ? this.radioRef_2.current!.value
          : this.radioRef_3.current!.value,
        checkbox:
          (this.checkboxRef_1.current?.checked ? this.checkboxRef_1.current?.value : '') +
          ' ' +
          (this.checkboxRef_2.current?.checked ? this.checkboxRef_2.current?.value : ''),
        image: URL.createObjectURL(this.fileRef!.current!.files![0]),
      };

      this.props.addCard(newCard);
      setTimeout(
        () =>
          this.setState({
            formIsValid: false,
          }),
        5000
      );
      this.clearFields();
    }
  };

  render() {
    const {
      formIsValid,
      inputError,
      dateError,
      selectError,
      radioError,
      checkboxError,
      fileError,
    } = this.state;

    return (
      <div className="form">
        <form className="form__content" ref={this.formRef} onSubmit={this.handleSubmit}>
          {/* <div className="form__input">
            <label htmlFor="form__input" className="form__label">
              Title:
            </label>
            <input type="text" id="form__input" ref={this.inputRef} />
            {inputError ? <div className="error">{inputError}</div> : null}
          </div> */}
          <InputText state={this.state} ref={this.inputRef} />
          <div className="form__date">
            <label htmlFor="form__date" className="form__label">
              Date of sale:
            </label>
            <input type="date" id="form__date" ref={this.dateRef} />
            {dateError ? <div className="error">{dateError}</div> : null}
          </div>
          <div className="form__select">
            <label htmlFor="form__select" className="form__label">
              Color:
            </label>
            <select id="form__select" ref={this.selectRef}>
              <option value="empty"></option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="pink">Pink</option>
              <option value="blue">Blue</option>
            </select>
            {selectError ? <div className="error">{selectError}</div> : null}
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
                ref={this.radioRef_1}
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
                ref={this.radioRef_2}
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
                ref={this.radioRef_3}
              />
              <label htmlFor="form__radio-3">Big</label>
            </div>
            {radioError ? <div className="error">{radioError}</div> : null}
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
            {checkboxError ? <div className="error">{checkboxError}</div> : null}
          </fieldset>
          <div className="form__file">
            <label htmlFor="form__file">Image: </label>
            <input id="form__file" type="file" name="file" ref={this.fileRef} />
            {fileError ? <div className="error">{fileError}</div> : null}
          </div>
          <button type="submit" className="form__button">
            Add card
          </button>
          {formIsValid && <div className="success">Сard has been added</div>}
        </form>
      </div>
    );
  }
}

export default Form;
