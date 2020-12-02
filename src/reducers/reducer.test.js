import reducer from './index';
import userReducer from './userReducer';
import trainReducer from './trainReducer';
import stationReducer from './stationReducer';
import roomReducer from './roomReducer';
import * as types from '../constants/actionTypes';

describe('userReducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      profile: null,
      currentLocation: { lat: 37.572823, lng: 126.976881 },
    };
  });

  it('should return the initial state', () => {
    expect(userReducer(initialState, [])).toEqual({
      profile: null,
      currentLocation: { lat: 37.572823, lng: 126.976881 },
    });
  });

  it('should handle GET_CURRENT_LOCATION', () => {
    expect(
      userReducer(initialState, {
        type: types.GET_CURRENT_LOCATION,
        location: { lat: 37.999, lng: 126.999 },
      })
    ).toEqual({
      profile: null,
      currentLocation: { lat: 37.999, lng: 126.999 },
    });
  });
});

describe('trainReducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      info: null,
      currentPosition: null,
    };
  });

  it('should return the initial state', () => {
    expect(trainReducer(initialState, [])).toEqual({
      info: null,
      currentPosition: null,
    });
  });

  it('should handle GET_TRAIN', () => {
    expect(
      trainReducer(initialState.info, {
        type: types.GET_TRAIN,
        info: 5959,
      })
    ).toEqual({ info: 5959 });
  });

  it('should handle GET_TRAIN_POSITION', () => {
    expect(
      trainReducer(initialState.currentPosition, {
        type: types.GET_TRAIN_POSITION,
        info: { current: '역삼역' },
      })
    ).toEqual({
      currentPosition: { current: '역삼역' },
    });
  });
});

describe('stationReducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      near: [],
      selected: null,
      realtimeArrivalInfo: null,
    };
  });

  it('should return the initial state', () => {
    expect(stationReducer(initialState, [])).toEqual({
      near: [],
      selected: null,
      realtimeArrivalInfo: null,
    });
  });

  it('should handle GET_STATION_LOCATION', () => {
    expect(
      stationReducer(initialState.near, {
        type: types.GET_STATION_LOCATION,
        stationLocation: [
          { position: 34.123, name: '삼성역' },
          { posiiton: 22.123, name: '가나다역' },
        ],
      })
    ).toEqual({
      near: [
        { position: 34.123, name: '삼성역' },
        { posiiton: 22.123, name: '가나다역' },
      ],
    });
  });

  it('should handle SELECT_STATION', () => {
    expect(
      stationReducer(initialState.selected, {
        type: types.SELECT_STATION,
        station: { name: '역삼역' },
      })
    ).toEqual({
      selected: { name: '역삼역' },
    });
  });

  it('should handle GET_REALTIME_ARRIVAL_INFO', () => {
    expect(
      stationReducer(initialState.selected, {
        type: types.GET_REALTIME_ARRIVAL_INFO,
        info: { duration: 2340 },
      })
    ).toEqual({
      realtimeArrivalInfo: { duration: 2340 },
    });
  });
});

describe('roomReducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      number: null,
      messages: [],
    };
  });

  it('should return the initial state', () => {
    expect(roomReducer(initialState.messages, [])).toEqual([]);
  });

  it('should handle GET_ROOM_NUMBER', () => {
    expect(
      roomReducer(initialState.number, {
        type: types.GET_ROOM_NUMBER,
        number: 121212,
      })
    ).toEqual({ number: 121212 });
  });

  it('should handle ADD_MESSAGE', () => {
    expect(
      roomReducer(initialState, {
        type: types.ADD_MESSAGE,
        user: 'TEST',
        message: { text: '메세지내용!!!', time: '2020-12-31' },
      })
    ).toEqual({
      number: null,
      messages: [
        {
          user: 'TEST',
          message: '메세지내용!!!',
          time: '2020-12-31',
        },
      ],
    });
  });
});

describe('OUT_ROOM', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      room: {
        number: null,
        messages: [],
      },
      station: {
        near: [],
        realtimeArrivalInfo: null,
        selected: null,
      },
      train: {
        currentPosition: null,
        info: null,
      },
      user: {
        currentLocation: {
          lat: 37.572823,
          lng: 126.976881,
        },
        profile: null,
      },
    };
  });

  it('should return the initial state', () => {
    expect(reducer(initialState, [])).toEqual({
      room: {
        number: null,
        messages: [],
      },
      station: {
        near: [],
        realtimeArrivalInfo: null,
        selected: null,
      },
      train: {
        currentPosition: null,
        info: null,
      },
      user: {
        currentLocation: {
          lat: 37.572823,
          lng: 126.976881,
        },
        profile: null,
      },
    });
  });

  it('should handle OUT_ROOM', () => {
    expect(
      reducer(
        {
          ...initialState,
          train: {
            currentPosition: 123.123123,
            info: { name: '판교역' },
          },
          user: {
            currentLocation: {
              lat: 1.222222,
              lng: 3.444444,
            },
            profile: 'abc',
          },
        },
        {
          type: types.OUT_ROOM,
        }
      )
    ).toEqual({
      room: {
        number: null,
        messages: [],
      },
      station: {
        near: [],
        realtimeArrivalInfo: null,
        selected: null,
      },
      train: {
        currentPosition: null,
        info: null,
      },
      user: {
        currentLocation: {
          lat: 1.222222,
          lng: 3.444444,
        },
        profile: null,
      },
    });
  });
});
