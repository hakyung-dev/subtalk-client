import * as types from '../constants/actionTypes';

const initialState = {
  name: null,
  currentLocation: { lat: 37.572823, lng: 126.976881 },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_NAME:
      return {
        ...state,
        name: action.name,
      };
    case types.GET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.location,
      };
    default:
      return state;
  }
};

export default userReducer;
