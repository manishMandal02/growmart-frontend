import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import classes from './OrdersTab.module.scss';
import { getMyOrdersList } from '../../../../Store/Actions/OrderActions/OrderActions';
import { Cancel, CheckCircle } from '@material-ui/icons';

//###########
const OrdersTab = ({ history }) => {
  //
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyOrdersList());
  }, [dispatch]);
  const { loading: loadingOrder, error: errorOrder, orders } = useSelector(
    (state) => state.order.orderListMy
  );

  return (
    <div className={classes.Container}>
      <p>MY ORDERS</p>
      <div className={classes.OrdersList}>
        {loadingOrder ? (
          <CircularProgress size={30} />
        ) : errorOrder ? (
          <Alert severity='error' variant='filled'>
            <strong>{errorOrder}</strong>
          </Alert>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align='left'>Date</TableCell>
                <TableCell align='left'>Total</TableCell>
                <TableCell align='left'>Paid</TableCell>
                <TableCell align='left'>Delivered</TableCell>
                <TableCell align='left'>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((p) => (
                <TableRow key={p._id}>
                  <TableCell component='th' scope='row'>
                    {p._id}
                  </TableCell>
                  <TableCell align='left'>{`${p.createdAt.substring(
                    0,
                    10
                  )} at ${p.createdAt.substring(11, 16)}`}</TableCell>
                  <TableCell align='left'>
                    <strong>{p.totalPrice}</strong>
                  </TableCell>
                  <TableCell align='center'>
                    {p.isPaid ? (
                      <CheckCircle color='primary' />
                    ) : (
                      <Cancel style={{ color: '#cf4826' }} />
                    )}
                  </TableCell>
                  <TableCell align='center'>
                    {p.isDelivered ? (
                      <CheckCircle color='primary' />
                    ) : (
                      <Cancel style={{ color: '#cf4826' }} />
                    )}
                  </TableCell>
                  <TableCell align='center'>
                    <button
                      onClick={() => history.push(`/user/order/${p._id}`)}
                      className={classes.DetailsButton}
                    >
                      Details
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default OrdersTab;
