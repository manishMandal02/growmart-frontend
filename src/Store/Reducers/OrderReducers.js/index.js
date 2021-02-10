import { combineReducers } from 'redux';

import {
  createOrderReducer,
  getMyOrdersListReducer,
  getOrderDetailsReducer,
  payOrderReducer,
} from './OrderReducers';

export const orderReducer = combineReducers({
  orderCreate: createOrderReducer,
  orderDetails: getOrderDetailsReducer,
  orderPay: payOrderReducer,
  orderListMy: getMyOrdersListReducer,
});
