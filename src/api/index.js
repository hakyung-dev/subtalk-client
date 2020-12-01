import axios from 'axios';
import { SERVER_URL } from '../config';

axios.defaults.baseURL = SERVER_URL;

export const getRealtimeArrivalApi = async (stationName) => {
  const realtimeArrival = await axios.get(
    `http://swopenapi.seoul.go.kr/api/subway/${process.env.REACT_APP_REALTIME_KEY}/json/realtimeStationArrival/0/20/${stationName}`
  );
  return realtimeArrival;
};

export const getTrainPositionApi = async (train) => {
  const getCurrentByLine = await axios.get(
    `http://swopenapi.seoul.go.kr/api/subway/${process.env.REACT_APP_REALTIME_KEY}/json/realtimePosition/0/20/${train.line}`
  );
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
