import React, { Component, createRef } from 'react';

class Form extends Component {
  inputRef = createRef<HTMLInputElement>();

  render() {
    return (
      <div className="form">
        <form className="form__content">
          <label className="form__label">
            Title: <input type="text" ref={this.inputRef} />
          </label>
          <label className="form__label">
            Date of sale: <input type="date" className="form__date" />
          </label>
          <label className="form__label">
            Choose color:{' '}
            <select className="form__select">
              <option value="Red">Red</option>
              <option value="Orange">Orange</option>
              <option value="Pink">Pink</option>
              <option value="Blue">Blue</option>
            </select>
          </label>
          <label className="form__label">
            Size:
            <input checked type="radio" value="Small" className="form__radio" name="size" /> Small
            <input type="radio" value="Medium" className="form__radio" name="size" /> Medium
            <input type="radio" value="Big" className="form__radio" name="size" /> Big
          </label>
          <label className="form__label">
            <input type="checkbox" name="checkbox" className="form__checkbox" />I agree with the
            rules
          </label>
          <label>
            Choose image: <input type="file" name="file" className="form__file" />
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
