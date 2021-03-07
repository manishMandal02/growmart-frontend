import {
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Tooltip,
  TextField,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Close, Visibility, VisibilityOff } from '@material-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './LoginModalMobile.module.scss';
import { userLogin } from '../../../Store/Actions/UsersActions/UserActions';
import { LOGIN_MOBILE_ClOSE } from '../../../Store/Actions/ActionTypes';
const LoginModalMobile = () => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.UI.mobileLoginOpen);

  //handel close
  const closeModalHandler = () => {
    const loginModal = document.getElementById('loginModal');
    const backdrop = document.getElementById('loginModalBackdrop');
    if (loginModal && backdrop) {
      loginModal.style.height = '0';
      backdrop.style.display = 'none';
      document.body.style.overflowY = 'scroll';
    }
  };
  if (open) {
    const loginModal = document.getElementById('loginModal');
    const backdrop = document.getElementById('loginModalBackdrop');
    if (loginModal && backdrop) {
      loginModal.style.height = '60%';
      backdrop.style.display = 'block';
      document.body.style.overflowY = 'hidden';
    }
  }
  if (!open) {
    closeModalHandler();
  }
  //
  const closeModal = () => {
    dispatch({
      type: LOGIN_MOBILE_ClOSE,
    });
  };

  //Login Handler /**************** */
  //Handels visiblity on modal
  const [visible, setVisible] = useState(false);
  const visiblityHandler = () => {
    visible ? setVisible(false) : setVisible(true);
  };
  //form Input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error } = useSelector((state) => state.user.login);

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
    if (!error) {
      setTimeout(() => closeModal(), 1000);
    }
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          closeModal();
        }}
        id='loginModalBackdrop'
        className={classes.Backdrop}
      ></div>
      <div id='loginModal' className={classes.Container}>
        <div className={classes.TopContainer}>
          <p>Login to Continue...</p>
          <span
            onClick={() => {
              closeModal();
            }}
          >
            <Close />
          </span>
        </div>
        <div className={classes.BottomContainer}>
          {error ? (
            <Alert
              style={{
                padding: '.1em 1em',
                marginBottom: '.4em',
              }}
              severity='error'
            >
              {error.substring(0, 35)}
            </Alert>
          ) : null}
          <form>
            <TextField
              id='standard-basic'
              label='E-mail'
              required
              autoFocus
              type='email'
              placeholder='Enter Your Email'
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl>
              <InputLabel htmlFor='standard-adornment-password'>
                Password *
              </InputLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <Link to='#'>Forgot Your Password?</Link>
            </div>

            <button type='submit' onClick={(e) => loginSubmitHandler(e)}>
              {loading ? (
                <CircularProgress
                  color='white'
                  size={26}
                  style={{ padding: '0', margin: '0' }}
                />
              ) : (
                `Login`
              )}
            </button>
            <p>-------OR-------</p>
          </form>
          <Tooltip title='Feature Underdevelopment' placement='top' arrow>
            <button className={classes.GoogleSignIn}>
              <FcGoogle /> Login With Google
            </button>
          </Tooltip>
          <p className={classes.RegisterHere}>
            Don't have an account?{' '}
            <Link onClick={() => closeModal()} to='/register'>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginModalMobile;
