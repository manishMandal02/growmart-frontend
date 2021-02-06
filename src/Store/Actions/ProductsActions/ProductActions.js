import axios from 'axios';
import {
  FETCH_PRODUCTSLIST_ERROR,
  FETCH_PRODUCTSLIST_REQUEST,
  FETCH_PRODUCTSLIST_SUCCESS,
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
} from '../ActionTypes';

export const getProductsList = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCTSLIST_REQUEST,
    });
    const { data } = await axios.get('/api/products');

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
