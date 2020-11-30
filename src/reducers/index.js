import { combineReducers } from 'redux';

import userReducer from './userReducer';
import stationReducer from './stationReducer';
import roomReducer from './roomReducer';
import trainReducer from './trainReducer';

export default combineReducers({
  user: userReducer,
  station: stationReducer,
  room: roomReducer,
  train: trainReducer,
});
