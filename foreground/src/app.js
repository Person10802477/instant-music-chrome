import 'babel-polyfill';
import React from "react";
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'

// logging
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

// containers
import Header from "./containers/Header/Header"
// import MainArea from "./components/MainArea/MainArea"
import MainAreaContainer from "./containers/MainAreaContainer/MainAreaContainer"
import Sidebar from "./components/Sidebar/Sidebar"
import RightColumn from "./containers/RightColumn/RightColumn"

import SandboxMessenger from "./others/SandboxMessenger"

// reducers
import rootReducers from './reducers';

if (process.env.NODE_ENV === 'development') {
  require('../main.html')
}

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <MainAreaContainer />
        <Sidebar />
        <RightColumn />
      </div>
    );
  }
}
  
const logger = createLogger();
const store = createStore(
  rootReducers,
  applyMiddleware(thunk, promise, logger)
);

$(function() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
  
  // exposing sandboxMessenger to a global namespace
  // so it can communicate with webview and sandbox
  window.app = {};
  app.sandboxMessenger = new SandboxMessenger(store, $('webview')[0]);
});
