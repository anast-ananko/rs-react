import React, { FC } from 'react';

import './notFound.scss';

const NotFound: FC = () => {
  return (
    <div className="not-found">
      <h3 className="not-found__title">Not found</h3>
      <p className="not-found__text">404</p>
    </div>
  );
};

export default NotFound;
