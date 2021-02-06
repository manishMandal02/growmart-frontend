import {
  FETCH_PRODUCTSLIST_ERROR,
  FETCH_PRODUCTSLIST_REQUEST,
  FETCH_PRODUCTSLIST_SUCCESS,
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
} from '../../Actions/ActionTypes';

export const productsListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FETCH_PRODUCTSLIST_REQUEST:
      return {
        products: [],
        loading: true,
      };
    case FETCH_PRODUCTSLIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case FETCH_PRODUCTSLIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getproductReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case FETCH_PRODUCT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
