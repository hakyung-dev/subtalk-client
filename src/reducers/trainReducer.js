import * as types from '../constants/actionTypes';

const initialState = {
  info: null,
  currentPosition: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TRAIN:
      return {
        ...state,
        info: action.info,
      };
    case types.GET_TRAIN_POSITION:
      return {
        ...state,
        currentPosition: action.info,
      };
    case types.OUT_ROOM:
      return {
        info: null,
        currentPosition: null,
      };
    default:
      return state;
  }
};

export default userReducer;
