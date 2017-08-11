import React from 'react';
import { Switch, Route } from 'react-router';

import App from './components/App';
// import LoggedInPage from './containers/LoggedInPage';

export default (
  <Switch>
    <Route path="/" component={App} />
  </Switch>
);
