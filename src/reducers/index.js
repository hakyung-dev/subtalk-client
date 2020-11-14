import { combineReducers } from 'redux';

import userReducer from './userReducer';
import locationReducer from './locationReducer';

export default combineReducers({
  user: userReducer,
  location: locationReducer,
});
