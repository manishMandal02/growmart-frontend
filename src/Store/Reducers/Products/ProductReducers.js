import {
  FETCH_PRODUCTSLIST_ERROR,
  FETCH_PRODUCTSLIST_REQUEST,
  FETCH_PRODUCTSLIST_SUCCESS,
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_TOP_PRODUCTS_REQUEST,
  FETCH_TOP_PRODUCTS_SUCCESS,
  FETCH_TOP_PRODUCTS_ERROR,
  FETCH_RELATED_PRODUCTS_ERROR,
  FETCH_RELATED_PRODUCTS_REQUEST,
  FETCH_RELATED_PRODUCTS_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_ERROR,
  PRODUCT_CREATE_REVIEW_RESET,
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
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
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

export const topProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FETCH_TOP_PRODUCTS_REQUEST:
      return {
        products: [],
        loading: true,
      };
    case FETCH_TOP_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case FETCH_TOP_PRODUCTS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const relatedProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FETCH_RELATED_PRODUCTS_REQUEST:
      return {
        products: [],
        loading: true,
      };
    case FETCH_RELATED_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case FETCH_RELATED_PRODUCTS_ERROR:
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

export const createProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_CREATE_REVIEW_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
