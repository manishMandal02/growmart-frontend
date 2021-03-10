import React from 'react';

import classes from './NotFound.module.scss';

const NotFound = ({ history }) => {
  return (
    <div className={classes.Container}>
      <p>404</p>
      <p>Page Not Found</p>
      <button onClick={() => history.push('/')}>Go Home</button>
    </div>
  );
};

export default NotFound;
