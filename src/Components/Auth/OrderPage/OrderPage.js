import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { VerifiedUser } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import classes from './OrderPage.module.scss';
import { ORDER_PAY_RESET } from '../../../Store/Actions/ActionTypes';
import {
  getOrderDetails,
  payOrder,
} from '../../../Store/Actions/OrderActions/OrderActions';

//###########
const OrderPage = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderPay = useSelector((state) => state.order.orderPay);

  const { loading: loadingPay, success: successPay } = orderPay;

  const { loading, error, order } = useSelector(
    (state) => state.order.orderDetails
  );

  const { userInfo } = useSelector((state) => state.user.login);

  useEffect(() => {
    if (!userInfo) {
      history.push(`/login?redirect=user/order/${match.params.id}`);
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
        console.log('reached onload');
      };

      document.body.appendChild(script);
    };

    if (!order || successPay || order._id !== orderId) {
      dispatch({
        type: ORDER_PAY_RESET,
      });
      console.log(sdkReady);
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [orderId, order, dispatch, successPay, sdkReady]);

  // payment Success Handler
  const paymentSuccessHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <>
      {loading ? (
        <CircularProgress size={60} />
      ) : error ? (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          <strong>{error}</strong>
        </Alert>
      ) : order ? (
        <div className={classes.Container}>
          <div className={classes.LeftWrapper}>
            <span className={classes.LeftContainer}>
              <div className={classes.OrderSummary}>
                <p className={classes.Heading}>
                  ORDER ID: <p className={classes.Content}>{order._id}</p>
                </p>
                <p className={classes.Heading}>
                  SHIPPING ADDRESS:
                  <br />
                  <p className={classes.User}>
                    Name: <p className={classes.Content}>{order.user.name}</p>
                  </p>
                  <p className={classes.User}>
                    Email: <p className={classes.Content}>{order.user.email}</p>
                  </p>
                  <p className={classes.User}>
                    Address:
                    <p
                      className={classes.Content}
                    >{`${order.shippingAddress.address} 
                 ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}.`}</p>
                  </p>
                </p>
                {order.isDelivered ? (
                  <div className={classes.Alert}>
                    <Alert severity='success'>
                      <strong>Delivered</strong>
                    </Alert>
                  </div>
                ) : (
                  <div className={classes.Alert}>
                    <Alert severity='error'>
                      <strong>Not Delivered</strong>
                    </Alert>
                  </div>
                )}
                <p className={classes.Heading}>
                  PAYMENT METHOD:
                  <span className={classes.Content}>{order.paymentMethod}</span>
                </p>
                {order.isPaid ? (
                  <div className={classes.Alert}>
                    <Alert severity='success'>
                      <strong>{`Paid on ${order.paidAt.substring(
                        0,
                        10
                      )} at ${order.paidAt.substring(11, 19)}`}</strong>
                    </Alert>
                  </div>
                ) : (
                  <div className={classes.Alert}>
                    <Alert severity='error'>
                      <strong>Not Paid</strong>
                    </Alert>
                  </div>
                )}

                <p
                  className={classes.Heading}
                >{`ORDER ITEMS: (${order.orderItems.length})`}</p>
                <div className={classes.ItemsList}>
                  {order.orderItems.map((p) => (
                    <div className={classes.OrderItems}>
                      <img src={p.image} alt={p.name} />
                      <Link to={`/product/${p.product}`}>{p.name}</Link>
                      <span>{`${p.qty} x ${p.price} = ${
                        p.qty * p.price
                      } `}</span>
                    </div>
                  ))}
                </div>
              </div>
            </span>
          </div>

          <div className={classes.RightWrapper}>
            <div className={classes.RightContainer}>
              {error ? (
                <div className={classes.Alert}>
                  <Alert severity='error'>
                    <strong>{error}</strong>
                  </Alert>
                </div>
              ) : null}
              <p>Price Details</p>
              <div>
                <p>
                  {`Price (${order.orderItems.length}) ${
                    order.orderItems.length >= 0 ? 'items' : 'item'
                  }`}
                  <span>${order.itemsPrice}</span>
                </p>
                <p>
                  Tax % <span>${order.taxPrice}</span>
                </p>
                <p>
                  Shipping Charges{' '}
                  <span>
                    {order.shippingPrice === 0
                      ? 'Free'
                      : `$${order.shippingPrice}`}
                  </span>
                </p>
                <p>
                  Total Amount <span>${order.totalPrice}</span>
                </p>
              </div>

              {!order.isPaid && (
                <div className={classes.PayButton}>
                  {loadingPay && <CircularProgress size={30} />}
                  {!sdkReady ? (
                    <CircularProgress size={30} />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={paymentSuccessHandler}
                    />
                  )}
                </div>
              )}
            </div>
            <span>
              <VerifiedUser />
              <p>
                Safe and Secure Payments.Easy returns.100% Authentic products.
              </p>
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OrderPage;
