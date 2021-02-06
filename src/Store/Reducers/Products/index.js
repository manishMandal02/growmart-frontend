import { combineReducers } from 'redux';

import { productsListReducer, getproductReducer } from './ProductReducers';

const productReducer = combineReducers({
  productsList: productsListReducer,
  productDetails: getproductReducer,
});

export default productReducer;
