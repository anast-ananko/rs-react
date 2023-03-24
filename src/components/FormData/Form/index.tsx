import React, { Component, createRef, RefObject } from 'react';

import { IFormProps, IFormState } from '../../../interfaces/form';
import InputText from './InputText';
import InputDate from './InputDate';
import Select from './Select';
import InputRadioItem from './InputRadioItem';
import InputCheckboxItem from './InputCheckboxItem';
import InputFile from './InputFile';

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
    } else {
      this.setState({
        inputError: '',
      });
    }
    return this.state.inputError ? false : true;
  };

  validateDate = () => {
    if (!this.dateRef.current!.value) {
      this.setState({
        dateError: 'Error: required field',
      });
    } else if (+Date.now() < +new Date(this.dateRef.current!.value)) {
      this.setState({
        dateError: 'Error: date cannot be greater than current',
      });
    } else {
      this.setState({
        dateError: '',
      });
    }
    return this.state.dateError ? false : true;
  };

  validateSelect = () => {
    if (this.selectRef.current!.value === 'empty') {
      this.setState({
        selectError: 'Error: required field',
      });
    } else {
      this.setState({
        selectError: '',
      });
    }
    return this.state.selectError ? false : true;
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
    } else {
      this.setState({
        radioError: '',
      });
    }
    return this.state.radioError ? false : true;
  };

  validateCheckbox = () => {
    if (!this.checkboxRef_1.current!.checked && !this.checkboxRef_2.current!.checked) {
      this.setState({
        checkboxError: 'Error: required field',
      });
    } else {
      this.setState({
        checkboxError: '',
      });
    }
    return this.state.checkboxError ? false : true;
  };

  validateFile = () => {
    if (!this.fileRef.current!.value) {
      this.setState({
        fileError: 'Error: required field',
      });
    } else {
      this.setState({
        fileError: '',
      });
    }
    return this.state.fileError ? false : true;
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
    const { formIsValid, radioError, checkboxError } = this.state;

    const radioInputItems = [
      {
        name: 'small',
        ref: this.radioRef_1,
      },
      { name: 'medium', ref: this.radioRef_2 },
      { name: 'big', ref: this.radioRef_3 },
    ];

    const checkboxInputItems = [
      {
        name: 'postcard',
        ref: this.checkboxRef_1,
      },
      {
        name: 'trinket',
        ref: this.checkboxRef_2,
      },
    ];

    return (
      <div className="form">
        <form className="form__content" ref={this.formRef} onSubmit={this.handleSubmit}>
          <InputText state={this.state} ref={this.inputRef} />
          <InputDate state={this.state} ref={this.dateRef} />
          <Select state={this.state} ref={this.selectRef} />
          <fieldset className="radio">
            <legend className="legend">Size:</legend>
            {radioInputItems.map((item, index) => (
              <InputRadioItem key={index} name={item.name} index={index} ref={item.ref} />
            ))}
            {radioError ? <div className="error">{radioError}</div> : null}
          </fieldset>
          <fieldset className="form__checkbox">
            <legend className="legend">Gift:</legend>
            {checkboxInputItems.map((item, index) => (
              <InputCheckboxItem key={index} name={item.name} index={index} ref={item.ref} />
            ))}
            {checkboxError ? <div className="error">{checkboxError}</div> : null}
          </fieldset>
          <InputFile state={this.state} ref={this.fileRef} />
          <button type="submit" className="form__button">
            Add card
          </button>
          {formIsValid && (
            <>
              <div className="success">
                <i className="fa-solid fa-exclamation"></i>Сard has been added
              </div>
            </>
          )}
        </form>
      </div>
    );
  }
}

export default Form;
