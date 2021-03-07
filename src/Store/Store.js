import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import productReducer from './Reducers/Products/index';
import userReducer from './Reducers/UsersReducer/index';
import { cartReducer } from './Reducers/CartReducer/CartReducer';
import { orderReducer } from './Reducers/OrderReducers.js/index';
import { UIReducer } from './Reducers/UIReducer';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};
const paymentMethodFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {};

const reducer = combineReducers({
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
  UI: UIReducer,
});

const initialState = {
  user: {
    login: {
      userInfo: userInfoFromStorage,
    },
  },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
