import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import {Provider} from 'react-redux';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore();

render(
  <AppContainer>
    <App store={store}/>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextRoot = require('./components/App'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <Provider store={store}>
          <NextRoot history={history} />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
