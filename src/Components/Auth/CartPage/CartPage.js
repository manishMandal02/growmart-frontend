import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import classes from './CartPage.module.scss';
import ProductCard from './ProductCard/CartProductCard';
import { ArrowBack, OpenInNew, VerifiedUser } from '@material-ui/icons';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useWindowSize } from '../../../Hooks/useWindowSize/useWindowSize';

import { Helmet } from 'react-helmet';
import { LOGIN_MOBILE_OPEN } from '../../../Store/Actions/ActionTypes';

//###########
const CartPage = ({ history }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user.login);

  //url params
  const urlParams = new URLSearchParams();

  //State
  const { cartItems } = useSelector((state) => state.cart);
  const [width] = useWindowSize();
  useEffect(() => {}, [cartItems]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  //price calculations
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const shippingPrice = addDecimals(itemsPrice > 10 ? 0 : 10);
  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)
  );

  // Handle snackbar state
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // const dispatch = useDispatch();

  //scroll to top on render
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox
  };
  scrollToTop();
  // handle View Price Details
  const handleViewPriceDetails = () => {
    document.getElementById('priceDetails').scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  };

  // handel CheckOut
  const handelCheckOut = () => {
    if (userInfo) {
      urlParams.set('step', 'shipping-address');
      history.push({
        pathname: '/user/create-order',
        search: urlParams.toString(),
      });
    } else {
      dispatch({
        type: LOGIN_MOBILE_OPEN,
      });
    }
  };

  return (
    <div className={classes.Container}>
      <Helmet>
        <title>{`My Shopping Cart | GrowMart`}</title>
      </Helmet>
      <div className={classes.LeftWrapper}>
        <div className={classes.Heading}>
          {width <= 900 && <ArrowBack onClick={() => history.goBack()} />} My
          Cart ({cartItems.length})
        </div>
        <span className={classes.LeftContainer}>
          {cartItems.length !== 0 ? (
            cartItems.map((p) => (
              <div key={uuidv4()} className={classes.Product}>
                <ProductCard
                  name={p.name}
                  image={p.image}
                  brand={p.brand}
                  price={p.price}
                  quantity={p.qty}
                  id={p.product}
                  openSnackbar={() => setSnackbarOpen(true)}
                />
              </div>
            ))
          ) : (
            <p className={classes.EmptyCartMessage}>
              Your Shopping Cart is Empty |
              <Link to='/'>
                Start Shopping <OpenInNew />
              </Link>
            </p>
          )}
        </span>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
      >
        <Alert severity='success' variant='filled'>
          <strong>Item Successfully Removed from your Cart</strong>
        </Alert>
      </Snackbar>
      {cartItems.length > 0 && (
        <div className={classes.RightWrapper}>
          <div className={classes.RightContainer}>
            <p id='priceDetails'>Price Details</p>
            <div>
              <p>
                {`Price (${cartItems.length}) ${
                  cartItems.length >= 0 ? 'items' : 'item'
                }`}{' '}
                <span>${itemsPrice}</span>
              </p>
              <p>
                Tax % <span>${taxPrice}</span>
              </p>
              <p>
                Shipping Charges <span>{shippingPrice}</span>
              </p>
              <p>
                Total Amount <span>${totalPrice}</span>
              </p>
            </div>
            {width > 900 && (
              <button
                disabled={cartItems.length <= 0}
                onClick={() =>
                  history.push(
                    '/login?redirect=user/create-order?shippping-address'
                  )
                }
              >
                Checkout
              </button>
            )}
          </div>
          <span>
            <VerifiedUser />{' '}
            <p>
              Safe and Secure Payments.Easy returns.100% Authentic products.
            </p>
          </span>
        </div>
      )}
      {width <= 900 && cartItems.length > 0 && (
        <div className={classes.PlaceOrder}>
          <p onClick={handleViewPriceDetails}>
            ${totalPrice} <span>View price details</span>
          </p>
          <button
            style={!userInfo ? { width: '50%' } : { width: '40%' }}
            onClick={handelCheckOut}
          >
            {userInfo ? `Checkout` : `Login & Checkout`}
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
