import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import productReducer from './Reducers/Products/index';
import userReducer from './Reducers/UsersReducer/index';
import { cartReducer } from './Reducers/CartReducer/CartReducer';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const reducer = combineReducers({
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
});

console.log(cartItemsFromStorage);

const initialState = {
  user: {
    login: {
      userInfo: userInfoFromStorage,
    },
  },
  cart: {
    cartItems: cartItemsFromStorage,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
