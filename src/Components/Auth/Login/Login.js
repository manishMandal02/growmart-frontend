import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

  const dispatch = useDispatch(props);
  const history = useHistory();
  const redirect = history.search ? history.search.split('=')[1] : '/';

  const loginSubmitHandler = (e) => {
    console.log(email, password);
    e.preventDefault();
    dispatch(userLogin({ email, password }));
    history.push(redirect);
  };

  return (
    <div className={classes.Login}>
      <div className={classes.LeftContainer}>
        <img src={Image} alt='Background' />
      </div>

      <div className={classes.RightContainer}>
        <h1>Welcome Back</h1>
        <p>Happy Shopping...</p>
        {/* {error ? <Alert severity='error'>{error}</Alert> : null} */}
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
            login
            {/* {loading ? (
              <CircularProgress color='white' size={30} thickness={4} />
            ) : (
              'Login'
            )} */}
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

export default Login;
