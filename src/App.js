import { Route, Switch, Redirect } from 'react-router-dom';

import Index from './pages/Index';
import Map from './pages/Map';
import Room from './pages/Room';
import NotFound from './pages/NotFound';
import './styles/index.scss';

const App = (props) => {
  return (
    <div className="App" id="screen">
      <Switch>
        <Route
          exact
          path="/map"
          render={(routerProps) => {
            if (!props.user) {
              return <Redirect to="/" />;
            } else {
              return <Map {...routerProps} {...props} />;
            }
          }}
        />
        <Route
          exact
          path="/chat/:id"
          render={(routerProps) => {
            if (!props.roomNumber) {
              return <Redirect to="/" />;
            } else {
              return <Room {...routerProps} {...props} />;
            }
          }}
        />
        <Route
          exact
          path="/"
          render={(routerProps) => <Index {...routerProps} {...props} />}
        />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </div>
  );
};

export default App;
