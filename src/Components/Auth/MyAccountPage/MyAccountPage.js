import {
  AccountCircle,
  ExitToApp,
  HomeWork,
  ListAlt,
  Person,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Snackbar, Tooltip } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import classes from './MyAccountPage.module.scss';
import OrdersTab from './OrdersTab/OrdersTab';
import {
  userLogout,
  userUpdateAction,
} from '../../../Store/Actions/UsersActions/UserActions';
import { Helmet } from 'react-helmet';
import { saveShippingAddress } from '../../../Store/Actions/CartActions/CartActions';

//###########
const MyAccountPage = ({ match }) => {
  //REDIRECT if user not loggedIn
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.user.login);
  if (!userInfo) {
    history.push('/login?redirect=my/account');
  }
  const { shippingAddress } = useSelector((state) => state.cart);

  //State
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarOpen2, setSnackbarOpen2] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [inputDisabled, setInputDisabled] = useState(true);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=my/account');
    }
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      if (userInfo) {
        if (match.params.keyword === 'account' && userInfo) {
          const accountTab = document.getElementById('user-account');
          accountTab.focus();
        } else if (match.params.keyword === 'address' && userInfo) {
          const addressTab = document.getElementById('user-address');
          addressTab.focus();
        } else {
          const ordersTab = document.getElementById('user-orders');
          ordersTab.focus();
        }
      }
    }
    if (shippingAddress) {
      setAddress(shippingAddress.address);
      setCity(shippingAddress.city);
      setZipcode(shippingAddress.zipcode);
      setCountry(shippingAddress.country);
    }
  }, [userInfo, history, match.params.keyword, dispatch, shippingAddress]);
  // const location = useLocation();
  const logoutHandler = () => {
    dispatch(userLogout());
  };

  // Handle snackbar state
  const handleSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbar2 = () => {
    setSnackbarOpen2(false);
  };

  const { loading, error } = useSelector((state) => state.user.update);
  //handles update profile click
  const updateProfileHandler = (e) => {
    e.preventDefault();
    setInputDisabled(true);
    if (name !== userInfo.name || email !== userInfo.email || password !== '') {
      dispatch(userUpdateAction({ name, email, password }));
      setSnackbarOpen(true);
    }
  };

  //handles update profile click
  const updateAddresseHandler = (e) => {
    e.preventDefault();
    setInputDisabled(true);
    if (
      address &&
      city &&
      zipcode &&
      country &&
      (address !== shippingAddress.address ||
        city !== shippingAddress.city ||
        zipcode !== shippingAddress.zipcode ||
        country !== shippingAddress.country)
    ) {
      dispatch(
        saveShippingAddress({
          address,
          zipcode,
          city,
          country,
        })
      );
      setSnackbarOpen2(true);
    }
  };

  return (
    userInfo && (
      <div className={classes.Container}>
        <Helmet>
          <title>{`My Account | GrowMart`}</title>
        </Helmet>
        <div className={classes.LeftContainer}>
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
            <Link to='/my/address' id='user-address'>
              <HomeWork /> My Address
            </Link>
            <Link to='/my/orders' id='user-orders'>
              <ListAlt />
              My Orders
            </Link>
            <Link to='/user/cart'>
              <ShoppingCartOutlined />
              My Cart
            </Link>
            <Link to='/' onClick={logoutHandler}>
              <ExitToApp />
              Logout
            </Link>
          </div>
        </div>
        <span className={classes.RightContainer}>
          {match.params.keyword === 'account' ? (
            <div className={classes.AccoutTab}>
              <p>UPDATE YOUR PROFILE</p>
              <form>
                <p>Name</p>
                <Tooltip
                  title={inputDisabled ? 'Edit Profile to make changes' : ''}
                  placement='top'
                >
                  <input
                    type='text'
                    disabled={inputDisabled}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Tooltip>
                <p>E-mail</p>
                <Tooltip
                  title={inputDisabled ? 'Edit Profile to make changes' : ''}
                  placement='top'
                >
                  <input
                    type='email'
                    disabled={inputDisabled}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Tooltip>
                <p>Password</p>
                <Tooltip
                  title={inputDisabled ? 'Edit Profile to make changes' : ''}
                  placement='top'
                >
                  <input
                    type='password'
                    disabled={inputDisabled}
                    value={password}
                    placeholder={'Enter Password'}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Tooltip>
                {!inputDisabled ? (
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
          ) : match.params.keyword === 'address' ? (
            <div className={classes.AddressTab}>
              <p>MANAGE ADDRESS</p>
              <Tooltip
                title='This feature is currently under developemnt'
                placement='bottom'
              >
                <button>
                  <span>+</span> Add New Address
                </button>
              </Tooltip>
              <div className={classes.Address}>
                <form>
                  <p>Address</p>

                  <input
                    type='text'
                    value={address}
                    placeholder={'Enter Address'}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <p>City</p>

                  <input
                    type='text'
                    value={city}
                    placeholder={'Enter City'}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <p>Zipcode</p>
                  <input
                    type='text'
                    value={zipcode}
                    placeholder={'Enter Zipcode'}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                  <p>Country</p>
                  <input
                    type='text'
                    value={country}
                    placeholder={'Enter Country'}
                    onChange={(e) => setCountry(e.target.value)}
                  />

                  <button
                    className={classes.UpdateAddressButton}
                    onClick={(e) => updateAddresseHandler(e)}
                  >
                    Update Address
                  </button>

                  <Snackbar
                    open={snackbarOpen2}
                    autoHideDuration={3000}
                    onClose={handleSnackbar2}
                  >
                    <Alert severity='success' variant='filled'>
                      Address Updated!
                    </Alert>
                  </Snackbar>
                </form>
              </div>
            </div>
          ) : (
            <div className={classes.OrdersTab}>
              <OrdersTab history={history} />
            </div>
          )}
        </span>
      </div>
    )
  );
};

export default MyAccountPage;
