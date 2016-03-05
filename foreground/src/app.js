import React from "react";
import ReactDOM from "react-dom";
// import RootReducers from 'reducers';
import Header from "./containers/Header/Header"
import MainArea from "./containers/MainArea/MainArea"
import Sidebar from "./containers/Sidebar/Sidebar"
import RightColumn from "./containers/RightColumn/RightColumn"

if (process.env.NODE_ENV === 'development') {
  require('../main.html')
}

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <MainArea />
        <Sidebar />
        <RightColumn />
      </div>
    );
  }
}

$(function() {
  ReactDOM.render(<App />, document.getElementById('app'));
});
