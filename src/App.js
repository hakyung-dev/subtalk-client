import { Route, Switch } from 'react-router-dom';

import Index from './pages/Index';
import Map from './pages/Map';
import './styles/index.scss';

const App = (props) => {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/map"
          render={(routerProps) => <Map {...routerProps} {...props} />}
        />
        <Route
          exact
          path="/"
          render={(routerProps) => <Index {...routerProps} {...props} />}
        />
      </Switch>
    </div>
  );
};

export default App;
