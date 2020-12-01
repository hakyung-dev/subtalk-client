import * as types from '../constants/actionTypes';

export const setName = (name) => ({
  type: types.SET_NAME,
  name,
});

export const getCurrentLocation = (location) => ({
  type: types.GET_CURRENT_LOCATION,
  location,
});

export const getStationLocation = (stationLocation) => ({
  type: types.GET_STATION_LOCATION,
  stationLocation,
});

export const selectStation = (station) => ({
  type: types.SELECT_STATION,
  station,
});

export const getRealtimeArrivalInfo = (info) => ({
  type: types.GET_REALTIME_ARRIVAL_INFO,
  info
});

export const getRoomNumber = (number) => ({
  type: types.GET_ROOM_NUMBER,
  number,
});

export const addMessage = (user, message) => ({
  type: types.ADD_MESSAGE,
  user,
  message
});

export const getTrain = (info) => ({
  type: types.GET_TRAIN,
  info
});

export const getTrainPosition = (info) => ({
  type: types.GET_TRAIN_POSITION,
  info
});

export const outRoom = () => ({
  type: types.OUT_ROOM,
});
