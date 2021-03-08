/* eslint-disable no-restricted-globals */
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './LoginPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconButton,
  InputAdornment,
  TextField,
  Input,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { userLogin } from '../../../Store/Actions/UsersActions/UserActions';
import { Alert } from '@material-ui/lab';
import { Helmet } from 'react-helmet';

//##########
const LoginPage = (props) => {
  //state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const login = useSelector((state) => state.user.login);
  const { loading, userInfo, error } = login;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  // console.log(location.search);

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [dispatch, userInfo, props.history, redirect]);

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox
  };
  scrollToTop();

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };

  const visiblityHandler = () => {
    visible ? setVisible(false) : setVisible(true);
  };

  return (
    <div className={classes.LoginPage}>
      <Helmet>
        <title>{`Login | GrowMart`}</title>
      </Helmet>
      <div className={classes.RightContainer}>
        <h1>Welcome back</h1>
        <p>Happy Shopping...</p>
        {error ? <Alert severity='error'>{error}</Alert> : null}
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
          {/* <div>
            <Link to='#'>Forgot Your Password?</Link>
          </div> */}

          <button type='submit' onClick={loginSubmitHandler}>
            {loading ? (
              <CircularProgress color='white' size={30} thickness={4} />
            ) : (
              'Login'
            )}
          </button>
          <p>-------OR-------</p>
        </form>
        <button>
          <FcGoogle /> Login With Google
        </button>
        <p>
          Don't have an account?{' '}
          <Link onClick={props.closeModal} to='/register'>
            Register here
          </Link>
        </p>
      </div>
      <div></div>
    </div>
  );
};

export default LoginPage;
