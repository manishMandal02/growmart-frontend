import axios from 'axios';
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
} from '../ActionTypes';

export const getProductsList = (
  keyword,
  pageNumber,
  pageSize,
  sortBy,
  priceFilterRange
) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCTSLIST_REQUEST,
    });

    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&priceFilter=${priceFilterRange[0]}-${priceFilterRange[1]}`
    );

    dispatch({
      type: FETCH_PRODUCTSLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTSLIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTopProducts = (limit = 12) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_TOP_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get(
      `/api/products/topproducts?limit=${limit}`
    );

    dispatch({
      type: FETCH_TOP_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TOP_PRODUCTS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRelatedProducts = (category) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_RELATED_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get(
      `/api/products/relatedproducts?category=${category}`
    );

    dispatch({
      type: FETCH_RELATED_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_RELATED_PRODUCTS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductsByCategory = (
  category,
  pageNumber,
  pageSize,
  sortBy,
  priceFilterRange
) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCTSLIST_REQUEST,
    });

    const { data } = await axios.get(
      `/api/products/category?category=${category}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&priceFilter=${priceFilterRange[0]}-${priceFilterRange[1]}`
    );

    dispatch({
      type: FETCH_PRODUCTSLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTSLIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductsByBrand = (
  brand,
  pageNumber,
  pageSize,
  sortBy,
  priceFilterRange
) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCTSLIST_REQUEST,
    });

    const { data } = await axios.get(
      `/api/products/brand?brand=${brand}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&priceFilter=${priceFilterRange[0]}-${priceFilterRange[1]}`
    );

    dispatch({
      type: FETCH_PRODUCTSLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTSLIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCT_REQUEST,
    });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview = (id, { rating, comment }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

    const {
      user: { login },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${login.userInfo.token}`,
      },
    };
    await axios.post(
      `/api/products/${id}/reviews`,
      { rating, comment },
      config
    );

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
