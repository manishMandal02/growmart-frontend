import { React, useState } from 'react';

import classes from './Login.module.scss';
import Image from '../../../Assets/Images/login-bg.png';
import {
  IconButton,
  InputAdornment,
  TextField,
  Input,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [visible, setVisible] = useState(false);

  const visiblityHandler = () => {
    visible ? setVisible(false) : setVisible(true);
  };

  return (
    <div className={classes.Login}>
      <div className={classes.LeftContainer}>
        {/* <p>GrowMart</p> */}
        <img src={Image} alt='Background' />
      </div>

      <div className={classes.RightContainer}>
        <h1>Welcome Back</h1>
        <p>Happy Shopping...</p>
        <form>
          <TextField
            id='standard-basic'
            label='E-mail'
            required
            placeholder='Enter Your Email'
            fullWidth
          />
          <FormControl>
            <InputLabel htmlFor='standard-adornment-password'>
              Password *
            </InputLabel>
            <Input
              id='standard-adornment-password'
              required
              fullWidth
              placeholder='Enter Your Password'
              type={visible ? 'text' : 'password'}
              // value={values.password}
              // onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={visiblityHandler}
                  >
                    {visible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div>
            <a href='/#'>Forgot Your Password?</a>
          </div>

          <button type='submit'>Login</button>
          <p>-------OR-------</p>
        </form>
        <button>
          <FcGoogle /> Login With Google
        </button>
        <p>
          Don't have an account? <a href='/#'> Register here</a>
        </p>
      </div>
      <div></div>
    </div>
  );
};

export default Login;
