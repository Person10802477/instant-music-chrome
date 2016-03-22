import React from "react";
window.classNames = require('classnames');

// containers
import HeaderContainer from "../../containers/HeaderContainer/HeaderContainer";
import MainAreaContainer from "../../containers/MainAreaContainer/MainAreaContainer";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightColumn from "../../components/RightColumn/RightColumn";
import WebviewContainer from "../../containers/WebviewContainer/WebviewContainer";

require('./app.css');

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <HeaderContainer />
        <MainAreaContainer />
        <Sidebar />
        <RightColumn />
        <WebviewContainer />
      </div>
    );
  }
}

export default App;