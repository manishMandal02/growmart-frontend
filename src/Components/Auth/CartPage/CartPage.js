import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './CartPage.module.scss';
import ProductCard from './ProductCard/CartProductCard';
import { CallMade, VerifiedUser } from '@material-ui/icons';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

//###########
const CartPage = () => {
  //State
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Handle snackbar state
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className={classes.Container}>
      <div className={classes.LeftWrapper}>
        <div className={classes.Heading}>My Cart ({cartItems.length})</div>
        <span className={classes.LeftContainer}>
          {cartItems.length !== 0 ? (
            cartItems.map((p) => (
              <ProductCard
                name={p.name}
                image={p.image}
                brand={p.brand}
                price={p.price}
                quantity={p.qty}
                id={p.product}
                snackbar={handleSnackbarOpen}
              />
            ))
          ) : (
            <p className={classes.EmptyCartMessage}>
              Your Shopping Cart is Empty |
              <Link to='/'>
                Start Shopping <CallMade />
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
      <div className={classes.RightWrapper}>
        <div className={classes.RightContainer}>
          <p>Price Details</p>
          <div>
            <p>
              {`Price (${cartItems.length}) ${
                cartItems.length >= 0 ? 'items' : 'item'
              }`}{' '}
              <span>${'289.00'}</span>
            </p>
            <p>
              Tax % <span>${'0'}</span>
            </p>
            <p>
              Shipping Charges <span>{'FREE'}</span>
            </p>
            <p>
              Total Amount <span>${'1240.00'}</span>
            </p>
          </div>
          <button disabled={cartItems.length <= 0}>Buy Now</button>
        </div>
        <span>
          <VerifiedUser />{' '}
          <p>Safe and Secure Payments.Easy returns.100% Authentic products.</p>
        </span>
      </div>
    </div>
  );
};

export default CartPage;
