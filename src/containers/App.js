import { connect } from 'react-redux';
import * as actions from '../actions';
import { getNearSubwayStationsApi } from '../api';
import { wgsToEpsg } from '../utils/transformCoordinates';
import App from '../App';

const mapStateToProps = (state) => ({
  name: state.user.name,
  currentLocation: state.location.current,
  stationLocation: state.location.nearStation,
});

const mapDispatchToProps = (dispatch) => {
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
      dispatch(actions.getStationLocation(res.data.stationList));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
