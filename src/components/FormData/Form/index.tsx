import React, { Component, createRef, RefObject } from 'react';

import { IFormProps, IFormState } from '../../../interfaces/form';
import InputText from './InputText';
import InputDate from './InputDate';
import Select from './Select';
import InputRadioItem from './InputRadioItem';
import InputCheckboxItem from './InputCheckboxItem';
import InputFile from './InputFile';
import { validateForm } from '../../../helpers/validationFunctions';

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

  clearFields = (): void => {
    this.formRef.current?.reset();
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (
      this.inputRef.current !== null &&
      this.dateRef.current !== null &&
      this.selectRef.current !== null &&
      this.radioRef_1.current !== null &&
      this.radioRef_2.current !== null &&
      this.radioRef_3.current !== null &&
      this.checkboxRef_1.current !== null &&
      this.checkboxRef_2.current !== null &&
      this.fileRef.current !== null
    ) {
      if (
        validateForm(
          this.inputRef.current.value,
          this.dateRef.current.value,
          this.selectRef.current.value,
          this.radioRef_1.current.checked,
          this.radioRef_2.current.checked,
          this.radioRef_3.current.checked,
          this.checkboxRef_1.current.checked,
          this.checkboxRef_2.current.checked,
          this.fileRef.current.value,
          this
        )
      ) {
        if (this.fileRef.current.files !== null) {
          const newCard = {
            title: this.inputRef.current.value,
            date: this.dateRef.current.value,
            color: this.selectRef.current.value,
            size: this.radioRef_1.current.checked
              ? this.radioRef_1.current.value
              : this.radioRef_2.current.checked
              ? this.radioRef_2.current.value
              : this.radioRef_3.current.value,
            checkbox:
              (this.checkboxRef_1.current.checked ? this.checkboxRef_1.current.value : '') +
              ' ' +
              (this.checkboxRef_2.current.checked ? this.checkboxRef_2.current.value : ''),
            image: URL.createObjectURL(this.fileRef.current.files[0]),
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
      }
    }
  };

  render() {
    const { formIsValid, radioError, checkboxError } = this.state;

    const radioInputItems = [
      { name: 'small', ref: this.radioRef_1 },
      { name: 'medium', ref: this.radioRef_2 },
      { name: 'big', ref: this.radioRef_3 },
    ];

    const checkboxInputItems = [
      { name: 'postcard', ref: this.checkboxRef_1 },
      { name: 'trinket', ref: this.checkboxRef_2 },
    ];

    return (
      <div className="form">
        <form
          className="form__content"
          data-testid="form"
          ref={this.formRef}
          onSubmit={this.handleSubmit}
        >
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
