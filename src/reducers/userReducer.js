import * as types from '../constants/actionTypes';

const initialState = {
  name: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_NAME:
      return {
        name: action.name,
      };
    default:
      return state;
  }
};

export default userReducer;
