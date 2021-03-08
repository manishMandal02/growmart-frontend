import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import classes from './MyAddressMobile.module.scss';
import { Helmet } from 'react-helmet';
import { ArrowBack } from '@material-ui/icons';
import { saveShippingAddress } from '../../../../Store/Actions/CartActions/CartActions';

//###########
const AddressPageMobile = ({ match }) => {
  //REDIRECT if user not loggedIn
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.user.login);
  if (!userInfo) {
    history.push('/login?redirect=my/account');
  }

  const { shippingAddress } = useSelector((state) => state.cart);

  //State
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=my/account');
    }

    if (shippingAddress) {
      setAddress(shippingAddress.address);
      setCity(shippingAddress.city);
      setZipcode(shippingAddress.zipcode);
      setCountry(shippingAddress.country);
    }
  }, [userInfo, history, shippingAddress]);

  // Handle snackbar state
  const handleSnackbar = () => {
    setSnackbarOpen(false);
  };

  //handles update address
  const updateAddresseHandler = (e) => {
    e.preventDefault();
    if (!shippingAddress) {
      if (address && city && zipcode && country) {
        dispatch(
          saveShippingAddress({
            address,
            zipcode,
            city,
            country,
          })
        );
        setSnackbarOpen(true);
      }
    } else if (
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
      setSnackbarOpen(true);
    }
  };

  return (
    <div className={classes.Container}>
      <Helmet>
        <title>{`My Address | GrowMart`}</title>
      </Helmet>

      <div className={classes.AccoutTab}>
        <div className={classes.TopHeading}>
          {/* <Person /> */}
          <p>
            {' '}
            <ArrowBack onClick={() => history.goBack()} /> My Address
          </p>
        </div>
        <div className={classes.AddressTab}>
          <button>
            <span>+</span> Add New Address
          </button>
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
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbar}
              >
                <Alert severity='success' variant='filled'>
                  Address Updated!
                </Alert>
              </Snackbar>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPageMobile;
