import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Login.module.scss';
import Image from '../../../Assets/Images/login-bg.png';
import {
  IconButton,
  InputAdornment,
  TextField,
  Input,
  InputLabel,
  FormControl,
  Tooltip,
  CircularProgress,
} from '@material-ui/core';
import { Close, Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { userLogin } from '../../../Store/Actions/UsersActions/UserActions';

// ############
// ############
const Login = (props) => {
  //Handels visiblity on modal
  const [visible, setVisible] = useState(false);
  const visiblityHandler = () => {
    visible ? setVisible(false) : setVisible(true);
  };
  //form Input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [demoUser, setDemoUser] = useState(false);

  const { loading, error, userInfo } = useSelector((state) => state.user.login);

  const dispatch = useDispatch();

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    setDemoUser(false);
    dispatch(userLogin({ email, password }));
    if (userInfo) {
      setTimeout(() => props.closeModal(), 1000);
    }
  };

  const loginSubmitHandlerDemo = (e) => {
    e.preventDefault();
    setDemoUser(true);
    dispatch(userLogin({ email: 'demo@example.com', password: 'demo123' }));
    if (userInfo) {
      setTimeout(() => props.closeModal(), 1000);
    }
  };

  return (
    <div className={classes.Login}>
      <div className={classes.LeftContainer}>
        <img src={Image} alt='Background' />
      </div>

      <div className={classes.RightContainer}>
        <Tooltip placement='left' title='Close' enterDelay={600}>
          <button
            onClick={() => props.closeModal()}
            className={classes.CloseButton}
          >
            <Close />
          </button>
        </Tooltip>
        <h1>Welcome Back</h1>
        <p>Happy Shopping...</p>
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
            <Tooltip title='Feature Underdevelopment' placement='left'>
              <Link to='#'>Forgot Your Password?</Link>
            </Tooltip>
          </div>

          <button type='submit' onClick={(e) => loginSubmitHandler(e)}>
            {loading && !demoUser ? (
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
        <button
          className={classes.GoogleSignIn}
          onClick={(e) => loginSubmitHandlerDemo(e)}
        >
          {loading && demoUser ? (
            <CircularProgress
              color='white'
              size={30}
              style={{ padding: '0', margin: '0' }}
            />
          ) : (
            `Demo Login`
          )}
        </button>
        <p className={classes.RegisterHere}>
          Don't have an account?{' '}
          <Link onClick={() => props.closeModal()} to='/register'>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
