import axios from 'axios';
import { SERVER_URL } from '../config';

axios.defaults.baseURL = SERVER_URL;

export const getRealtimeArrivalApi = async (stationName) => {
  const name = { stationName: stationName };
  const realtimeArrival = await axios.put(`api/getRealtimeArrival`, name);
  return realtimeArrival;
};

export const getTrainPositionApi = async (train) => {
  const getCurrentByLine = await axios.put(`api/getTrainPosition`, train);
  return getCurrentByLine;
};

export const getNearSubwayStationsApi = async (location) => {
  const subwayStation = await axios.put(`api/getNearSubwayStation`, location);
  return subwayStation;
};

export const getStationInfoApi = async (stationName) => {
  const name = { stationName: stationName };
  const stationInfo = await axios.put(`api/getStationInfo`, name);
  return stationInfo;
};
