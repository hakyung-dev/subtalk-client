import * as types from '../constants/actionTypes';

const initialState = {
  near: [],
  selected: null,
  realtimeArrivalInfo: null,
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STATION_LOCATION:
      return {
        ...state,
        near: action.stationLocation,
      };
    case types.SELECT_STATION:
      return {
        ...state,
        selected: action.station,
      };
    case types.GET_REALTIME_ARRIVAL_INFO:
      return {
        ...state,
        realtimeArrivalInfo: action.info,
      };
    default:
      return state;
  }
};

export default locationReducer;
