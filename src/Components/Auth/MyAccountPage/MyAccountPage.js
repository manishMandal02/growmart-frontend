import {
  AccountCircle,
  ExitToApp,
  ListAlt,
  Person,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './MyAccountPage.module.scss';
import {
  userLogout,
  userUpdateAction,
} from '../../../Store/Actions/UsersActions/UserActions';
import { Alert } from '@material-ui/lab';
import { CircularProgress, Snackbar } from '@material-ui/core';

//###########
const MyAccountPage = (props) => {
  //REDIRECT if user not loggedIn
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.user.login);
  if (!userInfo) {
    history.push('/login');
  }

  //State
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [inputDisabled, setInputDisabled] = useState(true);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
    }
  }, [userInfo, history]);
  const dispatch = useDispatch();
  // const location = useLocation();
  const logoutHandler = () => {
    dispatch(userLogout());
  };

  // Handle snackbar state
  const handleSnackbar = () => {
    setSnackbarOpen(false);
  };

  //Focus on current selected tab
  useEffect(() => {
    if (props.match.params.keyword === 'account') {
      const accountTab = document.getElementById('user-account');
      accountTab.focus();
    } else {
      const ordersTab = document.getElementById('user-orders');
      ordersTab.focus();
    }
  }, [props.match.params.keyword, userInfo]);

  const { loading, user, error } = useSelector((state) => state.user.update);
  //handles update profile click
  const updateProfileHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setInputDisabled(true);
    if (name !== userInfo.name || email !== userInfo.email || password !== '') {
      dispatch(userUpdateAction({ name, email, password }));
      setSnackbarOpen(true);
    }
  };

  return (
    <div className={classes.Container}>
      <span className={classes.LeftContainer}>
        <div className={classes.WelcomeCard}>
          <Person />
          <span>
            <p>Hello,</p>
            <p>{userInfo.name}</p>
          </span>
        </div>
        <div className={classes.SideMenu}>
          <Link to='/my/account' id='user-account'>
            <AccountCircle /> My Account
          </Link>
          <Link to='/my/orders' id='user-orders'>
            <ListAlt />
            My Orders
          </Link>
          <Link to='/user/cart' id='user-cart'>
            <ShoppingCartOutlined />
            My Cart
          </Link>
          <Link to='/' onClick={logoutHandler}>
            <ExitToApp />
            Logout
          </Link>
        </div>
      </span>
      <span className={classes.RightContainer}>
        {props.match.params.keyword === 'account' ? (
          <div className={classes.AccoutTab}>
            <form>
              <p>Name</p>
              <input
                type='text'
                disabled={inputDisabled}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p>E-mail</p>
              <input
                type='email'
                disabled={inputDisabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p>Password</p>
              <input
                type='password'
                disabled={inputDisabled}
                value={password}
                placeholder={'Enter Password'}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!inputDisabled ? (
                <button
                  className={classes.EditProfileButton}
                  onClick={(e) => updateProfileHandler(e)}
                >
                  {loading && !error ? (
                    <CircularProgress color='white' size={30} thickness={6} />
                  ) : (
                    'Update Profile'
                  )}
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setInputDisabled(false);
                  }}
                >
                  Edit Profile
                </button>
              )}

              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbar}
              >
                {error ? (
                  <Alert severity='error' variant='filled'>
                    {error}
                  </Alert>
                ) : (
                  <Alert severity='success' variant='filled'>
                    Profile Updated!
                  </Alert>
                )}
              </Snackbar>
            </form>
          </div>
        ) : (
          <div className={classes.OrdersTab}>
            <h1>My Orders</h1>
          </div>
        )}
      </span>
    </div>
  );
};

export default MyAccountPage;
