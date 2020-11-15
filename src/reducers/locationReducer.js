import * as types from '../constants/actionTypes';

const initialState = {
  current: { lat: 37.572823, lng: 126.976881 },
  stationInformation: null,
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CURRENT_LOCATION:
      return {
        ...state,
        current: action.location,
      };
    case types.GET_STATION_LOCATION:
      return {
        ...state,
        nearStation: action.stationLocation,
      };
    default:
      return state;
  }
};

export default locationReducer;
