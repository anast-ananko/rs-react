import React, { Component } from 'react';

import { IFormDataState } from '../../../interfaces/formDataState';

class FormCardsList extends Component<IFormDataState, Record<string, never>> {
  constructor(props: IFormDataState) {
    super(props);
  }
  render() {
    return (
      <div className="form-cards-list">
        {this.props.cards &&
          this.props.cards.map((item, index) => <div key={index}>{item.title}</div>)}
      </div>
    );
  }
}

export default FormCardsList;
