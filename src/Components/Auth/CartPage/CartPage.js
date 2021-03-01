import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import classes from './CartPage.module.scss';
import ProductCard from './ProductCard/CartProductCard';
import { CallMade, VerifiedUser } from '@material-ui/icons';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { removeItemFromCart } from '../../../Store/Actions/CartActions/CartActions';
import { Helmet } from 'react-helmet';

//###########
const CartPage = ({ history }) => {
  //State
  const { cartItems } = useSelector((state) => state.cart);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  //price calculations
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)
  );

  // Handle snackbar state
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const dispatch = useDispatch();

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox
  };
  scrollToTop();

  //handle remove item
  const itemRemoveHandler = (id) => {
    dispatch(removeItemFromCart(id));
    //temporary solution for quantity bug (when one item is removed with updateQty the next item takes the same qty of previous item quantity)
    window.location.reload();
    setSnackbarOpen(true);
  };

  return (
    <div className={classes.Container}>
      <Helmet>
        <title>{`My Shopping Cart | GrowMart`}</title>
      </Helmet>
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
                removeItem={itemRemoveHandler}
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
