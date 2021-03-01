import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { VerifiedUser } from '@material-ui/icons';
import { CircularProgress, Step, StepLabel, Stepper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import classes from './CreateOrderPage.module.scss';
import {
  saveShippingAddress,
  savePaymentMethod,
} from '../../../../Store/Actions/CartActions/CartActions';
import { createOrder } from '../../../../Store/Actions/OrderActions/OrderActions';

//###########
const CreateOrderPage = ({ history, location }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { cartItems } = cart;

  //State
  const [address, setAddress] = useState(' ');
  const [postalCode, setPostalCode] = useState(' ');
  const [city, setCity] = useState(' ');
  const [country, setCountry] = useState(' ');
  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const [activeStep, setActiveStep] = useState(1);

  //set address from the saved address
  useEffect(() => {
    if (cart.shippingAddress) {
      setAddress(cart.shippingAddress.address);
      setPostalCode(cart.shippingAddress.postalCode);
      setCity(cart.shippingAddress.city);
      setCountry(cart.shippingAddress.country);
    }
    if (cart.paymentMethod) {
      setPaymentMethod(cart.paymentMethod);
    }
    // if(success)
  }, [cart.shippingAddress, cart.paymentMethod]);

  const { loading, error, success, order } = useSelector(
    (state) => state.order.orderCreate
  );
  const { userInfo } = useSelector((state) => state.user.login);

  //Redirect
  useEffect(() => {
    if (!userInfo) {
      history.push(`/login?redirect=user/cart`);
    }
    if (success) {
      history.push(`/user/order/${order._id}`);
    }
  });

  //price calculations
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)
  );

  //handle place order click
  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  //JSX return
  return (
    <div className={classes.Container}>
      <div className={classes.LeftWrapper}>
        <div className={classes.Stepper}>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step>
              <StepLabel>SignIn</StepLabel>
            </Step>
            <Step>
              <StepLabel>Shipping Address</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment Method</StepLabel>
            </Step>
            <Step>
              <StepLabel>Order Summary</StepLabel>
            </Step>
          </Stepper>
        </div>
        <span className={classes.LeftContainer}>
          {activeStep === 1 ||
          location.search.split('=')[1] === 'shipping-address' ? (
            <div className={classes.Address}>
              <p>SHIPPING ADDRESS</p>
              <form>
                <label>Address</label>
                <input
                  maxLength='60'
                  type='text'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <label>City</label>
                <input
                  type='text'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <label>Postal Code</label>
                <input
                  type='text'
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                <label>Country</label>
                <input
                  type='text'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveStep(2);
                    dispatch(
                      saveShippingAddress({
                        address,
                        postalCode,
                        city,
                        country,
                      })
                    );
                    history.push({
                      search: '?payment-method',
                    });
                  }}
                  disabled={Boolean(
                    !address || !postalCode || !city || !country
                  )}
                >
                  Continue
                </button>
              </form>
            </div>
          ) : activeStep === 2 ? (
            <div className={classes.PaymentMethod}>
              <p>Select Payment Method</p>
              <form>
                <input
                  type='radio'
                  id='paypal'
                  value='Paypal'
                  checked={paymentMethod === 'Paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label for='paypal'>Paypal & Credit Card</label>
                <br />
                <input
                  type='radio'
                  id='stripe'
                  value='Stripe'
                  checked={paymentMethod === 'Stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label for='stripe'>Stripe (Debit & Credit Card)</label>
              </form>
              <button
                className={classes.BackButton}
                onClick={(e) => {
                  setActiveStep(1);
                  history.push({
                    search: '?shiiping-address',
                  });
                }}
              >
                Go Back
              </button>
              <button
                onClick={(e) => {
                  setActiveStep(3);
                  dispatch(savePaymentMethod(paymentMethod));
                  history.push({
                    search: '?order-summary',
                  });
                }}
              >
                Continue
              </button>
            </div>
          ) : activeStep === 3 ? (
            <div className={classes.OrderSummary}>
              {/* <p>Your Order Summary</p> */}
              <p>
                Shipping Address:
                <p>{`${cart.shippingAddress.address} 
                 ${cart.shippingAddress.city}, ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}.`}</p>
              </p>
              <p>
                Payment Method: <span>{cart.paymentMethod}</span>
              </p>
              <p>Order Items:</p>
              <div>
                {cartItems.map((p) => (
                  <div className={classes.OrderItems}>
                    <img src={p.image} alt={p.name} />
                    <Link to={`/product/${p.product}`}>{p.name}</Link>
                    <span>{`${p.qty} x ${p.price} = ${addDecimals(
                      p.qty * p.price
                    )} `}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </span>
      </div>

      <div className={classes.RightWrapper}>
        <div className={classes.RightContainer}>
          {!error ? null : (
            <Alert severity='error' variant='filled'>
              <strong>{error}</strong>
            </Alert>
          )}
          <p>Price Details</p>
          <div>
            <p>
              {`Price (${cartItems.length}) ${
                cartItems.length >= 0 ? 'items' : 'item'
              }`}{' '}
              <span>${cart.itemsPrice}</span>
            </p>
            <p>
              Tax % <span>${cart.taxPrice}</span>
            </p>
            <p>
              Shipping Charges <span>${cart.shippingPrice}</span>
            </p>
            <p>
              Total Amount <span>${cart.totalPrice}</span>
            </p>
          </div>
          <button disabled={activeStep < 3} onClick={handlePlaceOrder}>
            {loading ? (
              <CircularProgress color='white' size={35} />
            ) : (
              'Place Order'
            )}
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

export default CreateOrderPage;
