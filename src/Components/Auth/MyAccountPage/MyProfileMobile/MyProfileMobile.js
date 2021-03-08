import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import classes from './MyProfileMobile.module.scss';
import { userUpdateAction } from '../../../../Store/Actions/UsersActions/UserActions';
import { Helmet } from 'react-helmet';
import { ArrowBack } from '@material-ui/icons';

//###########
const ProfilePage = ({ match }) => {
  //REDIRECT if user not loggedIn
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.user.login);
  if (!userInfo) {
    history.push('/login?redirect=my/account');
  }

  //State
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=my/account');
    }
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
    }
  }, [userInfo, history]);

  // Handle snackbar state
  const handleSnackbar = () => {
    setSnackbarOpen(false);
  };

  const { loading, error } = useSelector((state) => state.user.update);
  //handles update profile click
  const updateProfileHandler = (e) => {
    e.preventDefault();
    if (name !== userInfo.name || email !== userInfo.email || password !== '') {
      dispatch(userUpdateAction({ name, email, password }));
      setSnackbarOpen(true);
    }
  };

  return (
    <div className={classes.Container}>
      <Helmet>
        <title>{`My Profile | GrowMart`}</title>
      </Helmet>

      <div className={classes.AccoutTab}>
        <div className={classes.TopHeading}>
          {/* <Person /> */}
          <p>
            {' '}
            <ArrowBack onClick={() => history.goBack()} /> My Profile
          </p>
        </div>
        <form>
          <p>Name</p>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>E-mail</p>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type='password'
            value={password}
            placeholder={'Enter Password'}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={classes.UpdateProfileButton}
            onClick={(e) => updateProfileHandler(e)}
          >
            {loading && !error ? (
              <CircularProgress color='white' size={30} thickness={6} />
            ) : (
              'Update Profile'
            )}
          </button>
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
    </div>
  );
};

export default ProfilePage;
