import { combineReducers } from 'redux';

import {
  productsListReducer,
  getproductReducer,
  topProductsReducer,
  relatedProductsReducer,
  createProductReviewReducer,
} from './ProductReducers';

const productReducer = combineReducers({
  productsList: productsListReducer,
  productDetails: getproductReducer,
  topProducts: topProductsReducer,
  relatedProducts: relatedProductsReducer,
  createProductReview: createProductReviewReducer,
});

export default productReducer;
