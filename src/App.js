import { Route, Switch } from 'react-router-dom';

import Index from './pages/Index';
import './styles/index.scss';

const App = (props) => {
  return (
    <div className="App">
      <Switch>
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
