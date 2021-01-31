import * as actionTypes from '../Actions/ActionTypes';

export const productsListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTSLIST_REQUEST:
      return {
        products: [],
        loading: true,
      };
    case actionTypes.FETCH_PRODUCTSLIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case actionTypes.FETCH_PRODUCTSLIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case actionTypes.FETCH_PRODUCT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
