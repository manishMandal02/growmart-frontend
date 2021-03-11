import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowBack, VerifiedUser } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Helmet } from 'react-helmet';
import { v4 as uuidv4 } from 'uuid';

import { useWindowSize } from '../../../Hooks/useWindowSize/useWindowSize';
import classes from './OrderPage.module.scss';
import {
  getOrderDetails,
} from '../../../Store/Actions/OrderActions/OrderActions';
import CartProductCard from '../CartPage/ProductCard/CartProductCard';

//###########
const OrderPage = ({ match, history }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector(
    (state) => state.order.orderDetails
  );

  const [width] = useWindowSize();
  const { userInfo } = useSelector((state) => state.user.login);
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);


  return width > 900 ? (
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
          <Helmet>
            <title>{`Order ${order._id} | GrowMart`}</title>
          </Helmet>
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
                {Boolean(order.isPaid) ? (
                  <div className={classes.Alert}>
                    <Alert severity='success'>
                      <strong>paid</strong>
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

              {/* {!order.isPaid && (
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
              )} */}
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
  ) : (
    <div className={classes.MobileContainer}>
      <div className={classes.TopHeading}>
        <p>
          <ArrowBack onClick={() => history.goBack()} />
          Order
        </p>
      </div>
      <div className={classes.OrderContainer}>
        {loading ? (
          <CircularProgress
            style={{ position: 'absolute', left: '45%', top: '15%' }}
          />
        ) : error ? (
          <Alert
            style={{ position: 'absolute', left: '45%', top: '20%' }}
            severity='error'
            variant='filled'
          >
            {error}
          </Alert>
        ) : order ? (
          <div className={classes.Order}>
            <div className={classes.StatusMobile}>
              <p>Order Status : </p>
              {order.isPaid && order.isDelivered ? (
                <div className={classes.OrderDelivered}> Delivered</div>
              ) : !order.isPaid && !order.isDelivered ? (
                <div className={classes.PaymentPending}>Not Paid</div>
              ) : (
                <div className={classes.OrderProcessing}> Processing</div>
              )}
            </div>

            <div className={classes.Address}>
              <p>Shipping Address</p>
              <p>{userInfo.name}</p>
              <p>{userInfo.email}</p>
              <p>
                {order.shippingAddress.address.length < 45
                  ? order.shippingAddress.address
                  : `${order.shippingAddress.address.substring(0, 45)}...`}
              </p>
              <p>
                {order.shippingAddress.city} - {order.shippingAddress.zipcode}{' '}
                {order.shippingAddress.country}
              </p>
            </div>
            <div className={classes.PaymentMethod}>
              <p>Payment Method</p>
              <span>
                {order.paymentMethod === 'Paypal' ? (
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
            </div>
            {order.orderItems.map((p) => (
              <div key={uuidv4()} className={classes.Product}>
                <CartProductCard
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
                    {`Price (${order.orderItems.length}) ${
                      order.orderItems.length >= 0 ? 'items' : 'item'
                    }`}{' '}
                    <span>${order.itemsPrice}</span>
                  </p>
                  <p>
                    Tax % <span>${order.taxPrice}</span>
                  </p>
                  <p>
                    Shipping Charges <span>${order.shippingPrice}</span>
                  </p>
                  <p>
                    Total Amount <span>${order.totalPrice}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OrderPage;
