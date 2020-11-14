import { connect } from 'react-redux';
import * as actions from '../actions';

import App from '../App';

const mapStateToProps = (state) => ({
  name: state.user.name,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setName(name) {
      dispatch(actions.setName(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
