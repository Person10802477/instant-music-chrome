import 'babel-polyfill';
import React from "react";
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'

// logging
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import SandboxMessenger from "./others/SandboxMessenger"

import App from "./components/App/App"

// reducers
import rootReducers from './reducers';

if (process.env.NODE_ENV === 'development') {
  require('../main.html')
}

const logger = createLogger();
const store = createStore(
  rootReducers,
  applyMiddleware(thunk, promise, logger)
);

$(function() {
  // exposing sandboxMessenger to a global namespace
  // so it can communicate with webview and sandbox
  window.app = {};
  app.sandboxMessenger = new SandboxMessenger(store, $('webview')[0]);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
});
