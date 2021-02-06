import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  UPDATE_CART_QTY,
} from '../ActionTypes';

export const addItemToCart = (id, qty = 1) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  console.log(getState().cart);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      brand: data.brand,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const updateCartQty = (id, qty) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_CART_QTY,
    payload: {
      id,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
