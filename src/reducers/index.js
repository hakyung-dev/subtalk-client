import { combineReducers } from 'redux';

import userReducer from './userReducer';
import stationReducer from './stationReducer';

export default combineReducers({
  user: userReducer,
  station: stationReducer,
});
