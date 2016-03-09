import React from "react";
window.classNames = require('classnames');

// containers
import HeaderContainer from "../../containers/HeaderContainer/HeaderContainer";
import MainAreaContainer from "../../containers/MainAreaContainer/MainAreaContainer"
import Sidebar from "../../components/Sidebar/Sidebar"
import RightColumn from "../../containers/RightColumn/RightColumn"

require('./app.css')

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <HeaderContainer />
        <MainAreaContainer />
        <Sidebar />
        <RightColumn />
      </div>
    );
  }
}

export default App;