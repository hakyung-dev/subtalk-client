import * as types from '../constants/actionTypes';

const initialState = {
  number: null,
  messages: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ROOM_NUMBER:
      return {
        ...state,
        number: action.number,
      };
    case types.ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat([
          {
            user: action.user,
            message: action.message.text,
            time: action.message.time,
          },
        ]),
      };
    case types.OUT_ROOM:
      return {
        number: null,
        messages: [],
      };
    default:
      return state;
  }
};

export default roomReducer;
