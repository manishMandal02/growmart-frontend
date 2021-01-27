import React from 'react';

import classes from './Login.module.scss';
import Image from '../../../Assets/Images/login-bg.png';

const Login = () => {
  return (
    <div className={classes.Login}>
      <div className={classes.LeftContainer}>
        <img src={Image} alt='Background' />
      </div>
      <div className={classes.RightContainer}></div>
      <div></div>
    </div>
  );
};

export default Login;
