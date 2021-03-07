import { LOGIN_MOBILE_OPEN, LOGIN_MOBILE_ClOSE } from '../Actions/ActionTypes';

export const UIReducer = (state = { mobileLoginOpen: false }, action) => {
  switch (action.type) {
    case LOGIN_MOBILE_OPEN:
      return {
        mobileLoginOpen: true,
      };
    case LOGIN_MOBILE_ClOSE:
      return {
        mobileLoginOpen: false,
      };
    default:
      return state;
  }
};
