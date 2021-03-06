import { connect } from 'react-redux';
import * as actions from '../actions';
import {
  getNearSubwayStationsApi,
  getStationInfoApi,
  getRealtimeArrivalApi,
  getTrainPositionApi,
} from '../api';
import { wgsToEpsg } from '../utils/transformCoordinates';
import socketClient from '../config/socket';
import App from '../App';

const mapStateToProps = (state) => ({
  user: state.user.profile,
  train: state.train.info,
  trainPosition: state.train.currentPosition,
  currentLocation: state.user.currentLocation,
  stationLocation: state.station.near,
  selectedStation: state.station.selected,
  realtimeArrivalInfo: state.station.realtimeArrivalInfo,
  roomNumber: state.room.number,
  roomMessages: state.room.messages,
});

const mapDispatchToProps = (dispatch) => {
  socketClient.on('anounce', (message) => {
    const anouncer = {
      name: 'anouncer',
      id: '000000000',
    };
    dispatch(actions.addMessage(anouncer, message));
  });

  socketClient.on('receive message', (user, message) => {
    dispatch(actions.addMessage(user, message));
  });

  return {
    setName(name) {
      dispatch(actions.setName(name));
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          dispatch(
            actions.getCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          );
        });
      }
    },
    async getNearStation(location) {
      const wgs = [location.lng, location.lat];
      const res = await getNearSubwayStationsApi(wgsToEpsg(wgs));
      dispatch(actions.getStationLocation(res.data.result));
    },
    async selectStation(station) {
      const res = await getStationInfoApi(station.name);
      const stationInfoByName = res.data.result.stationList;
      const filterById = (item) => {
        if (item.subwayId === station.subwayId) return true;
        return false;
      };
      const stationInformation = stationInfoByName.filter(filterById);
      dispatch(actions.selectStation(stationInformation[0]));
    },
    diselect() {
      dispatch(actions.selectStation(null));
      dispatch(actions.getRealtimeArrivalInfo(null));
    },
    async getRealtimeArrivalInfo(station) {
      const res = await getRealtimeArrivalApi(station.statnNm);
      const arrivalListByName = res.data.result.realtimeArrivalList;
      const upLine = [];
      const downLine = [];
      const filterById = (item) => {
        if (item.subwayId === station.subwayId) return true;
        return false;
      };
      if (arrivalListByName) {
        const filtered = arrivalListByName.filter(filterById);
        filtered.forEach((arrival, i) => {
          const findByNo = (item) => {
            if (item.btrainNo === arrival.btrainNo) return true;
            return false;
          };
          if (arrival.updnLine === '상행' || arrival.updnLine === '외선') {
            if (upLine.length === 0) {
              upLine.push(arrival);
            } else {
              if (!upLine.find(findByNo)) {
                upLine.push(arrival);
              }
            }
          } else {
            if (downLine.length === 0) {
              downLine.push(arrival);
            } else {
              if (!downLine.find(findByNo)) {
                downLine.push(arrival);
              }
            }
          }
        });
      }
      const arrivalInfo = { upLine: upLine, downLine: downLine };
      dispatch(actions.getRealtimeArrivalInfo(arrivalInfo));
    },
    enterRoom(roomNo, user) {
      dispatch(actions.getRoomNumber(roomNo));
      socketClient.emit('enter room', roomNo, user);
    },
    submitMessage(roomNo, user, message) {
      socketClient.emit('send message', roomNo, user, message);
    },
    outRoom(roomNo, user) {
      socketClient.emit('out room', roomNo, user);
      dispatch(actions.outRoom());
    },
    getTrainInfo(trainInfo) {
      dispatch(actions.getTrain(trainInfo));
    },
    async getTrainPosition(train) {
      const res = await getTrainPositionApi(train);
      const realtimePostionByLine = res.data.result.realtimePositionList;
      const findByNo = (item) => {
        if (item.trainNo === train.trainNo) return true;
        return false;
      };

      if (realtimePostionByLine) {
        const filtered = realtimePostionByLine.filter(findByNo);
        dispatch(actions.getTrainPosition(filtered[0]));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
