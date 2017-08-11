import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createMemoryHistory } from 'history';
// import routes from './routes';
import configureStore from './store';
import App from './components/App';

// const syncHistoryWithStore = (store, history) => {
//   const { routing } = store.getState();
//   if(routing && routing.location) {
//     history.replace(routing.location);
//   }
// };

const initialState = {};
const routerHistory = createMemoryHistory();
const store = configureStore(initialState, routerHistory);
// we do no persists state, no sync needed
// syncHistoryWithStore(store, routerHistory);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>
      <App store={store}/>
    </ConnectedRouter>
  </Provider>,
  rootElement
);
