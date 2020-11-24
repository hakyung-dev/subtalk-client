import * as types from '../constants/actionTypes';

const initialState = {
  profile: null,
  currentLocation: { lat: 37.572823, lng: 126.976881 },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_NAME:
      return {
        ...state,
        profile: {
          name: action.name,
          id: Date.now() + Math.floor(Math.random() * 1000),
        },
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
