import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ArrowBack, ArrowRightAlt, VerifiedUser } from '@material-ui/icons';
import { CircularProgress, Step, StepLabel, Stepper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { v4 as uuidv4 } from 'uuid';

import ProductCard from '../../CartPage/ProductCard/CartProductCard';
import { useWindowSize } from '../../../../Hooks/useWindowSize/useWindowSize';
import classes from './CreateOrderPage.module.scss';
import {
  saveShippingAddress,
  savePaymentMethod,
} from '../../../../Store/Actions/CartActions/CartActions';
import { CREATE_ORDER_RESET } from '../../../../Store/Actions/ActionTypes';
import { createOrder } from '../../../../Store/Actions/OrderActions/OrderActions';
import { Helmet } from 'react-helmet';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';

//###########
const CreateOrderPage = ({ history, location }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { cartItems } = cart;

  //url params
  const urlParams = new URLSearchParams(location.search);

  const stepParams = urlParams.get('step');

  const [width] = useWindowSize();

  //State
  const [address, setAddress] = useState(' ');
  const [zipcode, setZipcode] = useState(' ');
  const [city, setCity] = useState(' ');
  const [country, setCountry] = useState(' ');
  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const [activeStep, setActiveStep] = useState(0);

  const [sdkReady, setSdkReady] = useState(false);

  const addPaypalScript = async () => {
    const { data: clientId } = await axios.get('/api/config/paypal');
    const script = document.createElement('script');
    script.id = 'paypalScript';
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  const removePaypalScript = () => {
    const paypalScript = document.getElementById('paypalScript');
    if (paypalScript) {
      paypalScript.remove();
      setSdkReady(false);
    }
  };

  //set address from the saved address
  useEffect(() => {
    if (cart.shippingAddress) {
      setAddress(cart.shippingAddress.address);
      setZipcode(cart.shippingAddress.zipcode);
      setCity(cart.shippingAddress.city);
      setCountry(cart.shippingAddress.country);
    }
    if (cart.paymentMethod) {
      setPaymentMethod(cart.paymentMethod);
    }
    if (stepParams) {
      stepParams === 'payment'
        ? setActiveStep(3)
        : stepParams === 'payment-method'
        ? setActiveStep(1)
        : stepParams === 'order-summary'
        ? setActiveStep(2)
        : setActiveStep(0);
    }
    if (stepParams === 'payment') {
      if (!sdkReady) {
        addPaypalScript();
      }
    } else {
      removePaypalScript();
    }
  }, [cart.shippingAddress, cart.paymentMethod, stepParams, sdkReady]);

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
      dispatch({
        type: CREATE_ORDER_RESET,
      });
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
  cart.shippingPrice = addDecimals(cart.itemsPrice > 10 ? 0 : 10);
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)
  );

  //handle place order click
  const paypalPaymentSuccessHandler = (paymentResult) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
        paymentResult,
      })
    );
  };

  //JSX return
  return width > 900 ? (
    <div className={classes.Container}>
      <Helmet>
        <title>{`Checkout | GrowMart`}</title>
      </Helmet>
      <div className={classes.LeftWrapper}>
        <div className={classes.Stepper}>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step>
              <StepLabel>Shipping Address</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment Method</StepLabel>
            </Step>
            <Step>
              <StepLabel>Order Summary</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment</StepLabel>
            </Step>
          </Stepper>
        </div>
        <div className={classes.LeftContainer}>
          {stepParams === 'shipping-address' ? (
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
                <label>Zipcode</label>
                <input
                  type='text'
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
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
                    dispatch(
                      saveShippingAddress({
                        address,
                        zipcode,
                        city,
                        country,
                      })
                    );
                    urlParams.set('step', 'payment-method');
                    history.push({
                      search: urlParams.toString(),
                    });
                  }}
                  disabled={Boolean(!address || !zipcode || !city || !country)}
                >
                  Continue
                </button>
              </form>
            </div>
          ) : stepParams === 'payment-method' ? (
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
                <label htmlFor='paypal'>Paypal & Credit Card</label>
                <br />
                {/* <Tooltip title='Feature currently underdevelopment'> */}
                <input
                  type='radio'
                  id='stripe'
                  value='Stripe'
                  checked={paymentMethod === 'Stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor='stripe'>
                  Stripe (Debit & Credit Card){' '}
                  <span>*currently underdevelopment</span>
                </label>
                {/* </Tooltip> */}
              </form>
              <button
                className={classes.BackButton}
                onClick={(e) => {
                  history.goBack();
                }}
              >
                Go Back
              </button>
              <button
                onClick={(e) => {
                  urlParams.set('step', 'order-summary');
                  dispatch(savePaymentMethod(paymentMethod));
                  history.push({
                    search: urlParams.toString(),
                  });
                }}
              >
                Continue
              </button>
            </div>
          ) : stepParams === 'order-summary' ? (
            <div className={classes.OrderSummary}>
              {/* <p>Your Order Summary</p> */}
              <p>
                Shipping Address:
                <p>{`${cart.shippingAddress.address} 
                 ${cart.shippingAddress.city}, ${cart.shippingAddress.zipcode}, ${cart.shippingAddress.country}.`}</p>
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
              <button
                className={classes.BackButton}
                onClick={(e) => {
                  history.goBack();
                }}
              >
                Go Back
              </button>
              <button
                onClick={(e) => {
                  urlParams.set('step', 'payment');
                  history.push({
                    search: urlParams.toString(),
                  });
                }}
              >
                Continue
              </button>
            </div>
          ) : stepParams === 'payment' ? (
            <div
              style={{
                fontSize: '1.4em',
                display: 'flex',
                alignItems: 'center',
                padding: '1em 0',
                fontWeight: '600',
              }}
            >
              Complete your payment with {cart.paymentMethod}
              <ArrowRightAlt />
            </div>
          ) : null}
        </div>
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
          {activeStep === 3 && (
            <div className={classes.PaypalButton}>
              {/* {loadingPay && <CircularProgress size={30} />} */}
              {!sdkReady ? (
                <CircularProgress size={30} />
              ) : loading ? (
                <CircularProgress />
              ) : (
                <PayPalButton
                  amount={cart.totalPrice}
                  onSuccess={paypalPaymentSuccessHandler}
                />
              )}
            </div>
          )}
        </div>
        <span>
          <VerifiedUser />{' '}
          <p>Safe and Secure Payments.Easy returns.100% Authentic products.</p>
        </span>
      </div>
    </div>
  ) : (
    //************** */
    <div className={classes.MobileContainer}>
      <Helmet>
        <title>{`Checkout | GrowMart`}</title>
      </Helmet>
      <div className={classes.TopHeading}>
        <p>
          {' '}
          <ArrowBack onClick={() => history.goBack()} />{' '}
          {activeStep === 3
            ? 'Payment'
            : activeStep === 1
            ? 'Payment Method'
            : activeStep === 2
            ? 'Order Summary'
            : 'Select Address'}
        </p>
      </div>
      <div className={classes.Stepper}>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>Shipping Address</StepLabel>
          </Step>
          <Step>
            <StepLabel>Payment Method</StepLabel>
          </Step>
          <Step>
            <StepLabel>Order Summary</StepLabel>
          </Step>
          <Step>
            <StepLabel>Payment</StepLabel>
          </Step>
        </Stepper>
      </div>
      <div className={classes.BottomContainer}>
        {stepParams === 'shipping-address' ? (
          <div className={classes.Address}>
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
              <label>Zipcode</label>
              <input
                type='text'
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
              <label>Country</label>
              <input
                type='text'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <div className={classes.Continue}>
                <p>
                  ${cart.totalPrice} <span>Orer Total Price</span>
                </p>
                <button
                  disabled={Boolean(!address || !zipcode || !city || !country)}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      saveShippingAddress({
                        address,
                        zipcode,
                        city,
                        country,
                      })
                    );
                    urlParams.set('step', 'payment-method');
                    history.push({
                      search: urlParams.toString(),
                    });
                  }}
                >
                  {'Continue'}
                </button>
              </div>
            </form>
          </div>
        ) : stepParams === 'payment-method' ? (
          <div className={classes.PaymentMethod}>
            <form>
              <div className={classes.Paypal}>
                <input
                  type='radio'
                  id='paypal'
                  value='Paypal'
                  checked={paymentMethod === 'Paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor='paypal'>Paypal</label>
                <img
                  src='https://cdn.iconscout.com/icon/free/png-512/paypal-4-226455.png'
                  alt='paypal'
                />
              </div>
              <div className={classes.Stripe}>
                <input
                  type='radio'
                  id='stripe'
                  value='Stripe'
                  checked={paymentMethod === 'Stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor='stripe'>Stripe </label>
                <i className='fab fa-stripe '></i>
              </div>
            </form>
            <div className={classes.Continue}>
              <p>
                ${cart.totalPrice} <span>Orer Total Price</span>
              </p>
              <button
                onClick={() => {
                  urlParams.set('step', 'order-summary');
                  dispatch(savePaymentMethod(paymentMethod));
                  history.push({
                    search: urlParams.toString(),
                  });
                }}
              >
                {'Continue'}
              </button>
            </div>
          </div>
        ) : stepParams === 'order-summary' ? (
          <div className={classes.OrderSummary}>
            {/* <p>Your Order Summary</p> */}
            <div className={classes.Address}>
              <p>{userInfo.name}</p>
              <p>{userInfo.email}</p>
              <p>
                {cart.shippingAddress.address.length < 45
                  ? cart.shippingAddress.address
                  : `${cart.shippingAddress.address.substring(0, 45)}...`}
              </p>
              <p>
                {cart.shippingAddress.city} - {cart.shippingAddress.zipcode}{' '}
                {cart.shippingAddress.country}
              </p>
              <button
                onClick={() => {
                  urlParams.set('step', 'shipping-address');
                  history.push({
                    search: urlParams.toString(),
                  });
                }}
              >
                Update Address
              </button>
            </div>
            <div className={classes.PaymentMethod}>
              <span>
                {cart.paymentMethod === 'Paypal' ? (
                  <div className={classes.Paypal}>
                    <img
                      src='https://cdn.iconscout.com/icon/free/png-512/paypal-4-226455.png'
                      alt='paypal'
                    />
                    <p>PayPal </p>
                  </div>
                ) : (
                  <div className={classes.Stripe}>
                    <i className='fab fa-stripe '></i>
                    <p>Stripe </p>
                  </div>
                )}
              </span>
              <button
                onClick={() => {
                  urlParams.set('step', 'payment-method');
                  history.push({
                    search: urlParams.toString(),
                  });
                }}
              >
                Update Payment Method
              </button>
            </div>
            {cartItems.map((p) => (
              <div key={uuidv4()} className={classes.Product}>
                <ProductCard
                  name={p.name}
                  image={p.image}
                  brand={p.brand}
                  price={p.price}
                  quantity={p.qty}
                  id={p.product}
                />
              </div>
            ))}

            <div className={classes.RightWrapper}>
              <div className={classes.RightContainer}>
                {!error ? null : (
                  <Alert severity='error' variant='filled'>
                    <strong>{error}</strong>
                  </Alert>
                )}
                <p id='priceDetails'>Price Details</p>
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
              </div>
            </div>
            <div className={classes.Continue}>
              <p
                onClick={() => {
                  document.getElementById('priceDetails').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest',
                  });
                }}
              >
                ${cart.totalPrice} <span>View Price Details</span>
              </p>
              <button
                onClick={() => {
                  urlParams.set('step', 'payment');
                  setActiveStep(3);
                  history.push({
                    search: urlParams.toString(),
                  });
                }}
              >
                {'Continue'}
              </button>
            </div>
          </div>
        ) : stepParams === 'payment' ? (
          <div className={classes.Payment}>
            <div className={classes.RightWrapper}>
              <div className={classes.RightContainer}>
                <p id='priceDetails'>Price Details</p>
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

                <div className={classes.PaypalButton}>
                  {/* {loadingPay && <CircularProgress size={30} />} */}
                  {!sdkReady ? (
                    <CircularProgress size={30} />
                  ) : loading ? (
                    <CircularProgress />
                  ) : (
                    <PayPalButton
                      amount={cart.totalPrice}
                      onSuccess={paypalPaymentSuccessHandler}
                    />
                  )}
                </div>
              </div>
              <div className={classes.PaypalSecured}>
                <img
                  src='https://res.cloudinary.com/vastia/image/upload/v1615363765/growmart/Credit-Card-Icons_krwery.jpg'
                  alt='paypalSecure'
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CreateOrderPage;
