import { combineReducers } from 'redux';

import { loginReducer, updateUserReducer } from './UserReducer';

const userReducer = combineReducers({
  login: loginReducer,
  update: updateUserReducer,
});

export default userReducer;
