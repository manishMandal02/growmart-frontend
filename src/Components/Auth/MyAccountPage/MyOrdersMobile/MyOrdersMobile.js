import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './MyOrdersMobile.module.scss';
import { Helmet } from 'react-helmet';
import { ArrowBack } from '@material-ui/icons';
import { getMyOrdersList } from '../../../../Store/Actions/OrderActions/OrderActions';
import { Alert } from '@material-ui/lab';
import { CircularProgress } from '@material-ui/core';

//###########
const MyOrdersMobilePage = ({ match }) => {
  //REDIRECT if user not loggedIn
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.user.login);
  if (!userInfo) {
    history.push('/login?redirect=my/account');
  }

  const dispatch = useDispatch();

  //
  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=my/account');
    }
    dispatch(getMyOrdersList());
  }, [dispatch, userInfo, history]);
  const { loading, error, orders } = useSelector(
    (state) => state.order.orderListMy
  );

  return (
    <div className={classes.Container}>
      <Helmet>
        <title>{`My Orders | GrowMart`}</title>
      </Helmet>

      <div className={classes.TopHeading}>
        <p>
          {' '}
          <ArrowBack onClick={() => history.goBack()} /> My Orders
        </p>
      </div>

      <div className={classes.OrdersTab}>
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
        ) : (
          orders.map((order) => (
            <div
              className={classes.Order}
              onClick={() => history.push(`/user/order/${order._id}`)}
            >
              <p>Order #{order._id}</p>
              <p>{order.createdAt.substring(0, 10)}</p>
              <p>${order.totalPrice}</p>
              <dev>
                {order.isPaid && order.isDelivered ? (
                  <div className={classes.OrderDelivered}>Order Delivered</div>
                ) : !order.isPaid && !order.isDelivered ? (
                  <div className={classes.PaymentPending}>Payment Pending</div>
                ) : (
                  <div className={classes.OrderProcessing}>
                    Order Processing
                  </div>
                )}
              </dev>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrdersMobilePage;
