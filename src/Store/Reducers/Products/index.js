import { combineReducers } from 'redux';

import {
  productsListReducer,
  getproductReducer,
  topProductsReducer,
  relatedProductsReducer,
} from './ProductReducers';

const productReducer = combineReducers({
  productsList: productsListReducer,
  productDetails: getproductReducer,
  topProducts: topProductsReducer,
  relatedProducts: relatedProductsReducer,
});

export default productReducer;
