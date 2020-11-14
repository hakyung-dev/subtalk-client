import { connect } from 'react-redux';
import * as actions from '../actions';

import App from '../App';

const mapStateToProps = (state) => ({
  name: state.user.name,
  currentLocation: state.location.current,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
