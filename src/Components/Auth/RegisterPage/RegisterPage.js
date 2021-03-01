import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './RegisterPage.module.scss';
// import Image from '../../../Assets/Imageslogin-bg.png';
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
import { Alert } from '@material-ui/lab';
import { userRegister } from '../../../Store/Actions/UsersActions/UserActions';
import { Helmet } from 'react-helmet';

// ############
const Register = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const visiblityHandler = () => {
    visible ? setVisible(false) : setVisible(true);
  };

  const dispatch = useDispatch();
  const login = useSelector((state) => state.user.login);
  const { loading, userInfo, error } = login;

  const redirect = props.history.search
    ? props.history.search.split('=')[1]
    : '/';
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox
  };
  scrollToTop();
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [dispatch, userInfo, props.history, redirect]);

  const registerSubmitHandler = (e) => {
    console.log(email, password);
    e.preventDefault();
    dispatch(userRegister({ name, email, password }));
  };

  return (
    <div className={classes.Register}>
      <Helmet>
        <title>{`Register | GrowMart`}</title>
      </Helmet>
      <div className={classes.RightContainer}>
        <h1>Welcome | Register here</h1>
        <p>Happy Shopping...</p>
        {error ? <Alert severity='error'>{error}</Alert> : null}
        <form>
          <TextField
            id='standard-basic'
            label='Name'
            required
            autoFocus
            type='text'
            placeholder='Enter Your Name'
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          <button type='submit' onClick={(e) => registerSubmitHandler(e)}>
            {loading ? (
              <CircularProgress color='white' size={26} thickness={4} />
            ) : (
              'Register'
            )}
          </button>
          <p>-------OR-------</p>
        </form>
        <button>
          <FcGoogle /> Register With Google
        </button>
        <p>
          Already have an account?
          <Link onClick={props.closeModal} to='/login'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
