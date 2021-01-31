import axios from 'axios';
import * as actionTypes from './ActionTypes';

export const getProductsList = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FETCH_PRODUCTSLIST_REQUEST,
    });
    const { data } = await axios.get('api/products');

    dispatch({
      type: actionTypes.FETCH_PRODUCTSLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_PRODUCTSLIST_ERROR,
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
      type: actionTypes.FETCH_PRODUCT_REQUEST,
    });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: actionTypes.FETCH_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_PRODUCT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
