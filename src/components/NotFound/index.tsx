import React, { Component } from 'react';

import './notFound.scss';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <h3 className="not-found__title">Not found</h3>
        <p className="not-found__text">404</p>
      </div>
    );
  }
}

export default NotFound;
