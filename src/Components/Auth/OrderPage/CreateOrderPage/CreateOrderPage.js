import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ArrowBack, VerifiedUser } from '@material-ui/icons';
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
import { createOrder } from '../../../../Store/Actions/OrderActions/OrderActions';
import { Helmet } from 'react-helmet';

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
  const [activeStep, setActiveStep] = useState(1);

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
        ? setActiveStep(4)
        : stepParams === 'payment-method'
        ? setActiveStep(2)
        : stepParams === 'order-summary'
        ? setActiveStep(3)
        : setActiveStep(1);
    }
  }, [cart.shippingAddress, cart.paymentMethod, stepParams]);

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
  cart.shippingPrice = addDecimals(cart.itemsPrice > 10 ? 0 : 10);
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
  return width > 900 ? (
    <div className={classes.Container}>
      <Helmet>
        <title>{`Checkout | GrowMart`}</title>
      </Helmet>
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
            {width <= 900}
          </Stepper>
        </div>
        <div className={classes.LeftContainer}>
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
                    setActiveStep(2);
                    dispatch(
                      saveShippingAddress({
                        address,
                        zipcode,
                        city,
                        country,
                      })
                    );
                    history.push({
                      search: '?payment-method',
                    });
                  }}
                  disabled={Boolean(!address || !zipcode || !city || !country)}
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
  ) : (
    <div className={classes.MobileContainer}>
      <Helmet>
        <title>{`Checkout | GrowMart`}</title>
      </Helmet>
      <div className={classes.TopHeading}>
        <p>
          {' '}
          <ArrowBack onClick={() => history.goBack()} />{' '}
          {activeStep === 4
            ? 'payment'
            : activeStep === 2
            ? 'Payment Method'
            : activeStep === 3
            ? 'Order Summary'
            : 'Select Address'}
        </p>
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
                  onClick={() => {
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
              <span>
                <VerifiedUser />{' '}
                <p>
                  Safe and Secure Payments.Easy returns.100% Authentic products.
                </p>
              </span>
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
        ) : null}
      </div>
    </div>
  );
};

export default CreateOrderPage;
