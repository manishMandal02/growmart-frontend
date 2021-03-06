import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
  UPDATE_CART_QTY,
} from '../../Actions/ActionTypes';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((p) => p.product === item.product);
      if (existItem && existItem.qty === item.qty) {
        return {
          ...state,
          cartItems: [...state.cartItems],
        };
      } else if (existItem && existItem.qty !== item.qty) {
        const updatedItemList = state.cartItems.filter(
          (p) => p.product !== item.product
        );

        return {
          ...state,
          cartItems: [...updatedItemList, item],
        };
      } else {
        return {
          ...state,
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

    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
