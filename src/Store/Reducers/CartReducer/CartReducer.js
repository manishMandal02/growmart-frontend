import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  UPDATE_CART_QTY,
} from '../../Actions/ActionTypes';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      console.log(state);
      const item = action.payload;
      const existItem = state.cartItems.find((p) => p.product === item.product);
      console.log(existItem);
      if (existItem) {
        return {
          ...state,
          cartItems: [...state.cartItems],
        };
      } else {
        console.log(state.cartItems);
        return {
          // ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case UPDATE_CART_QTY:
      const id = action.payload.id;
      const newQty = action.payload.qty;
      const updatedItemList = state.cartItems.map((p) => {
        if (p.product === id) {
          p.qty = newQty;
          return p;
        }
        return p;
      });
      return {
        ...state,
        cartItems: [...updatedItemList],
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((p) => p.product !== action.payload),
      };
    default:
      return state;
  }
};
