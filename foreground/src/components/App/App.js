import React from "react";

import HeaderContainer from "../../containers/HeaderContainer/HeaderContainer";
import MainAreaContainer from "../../containers/MainAreaContainer/MainAreaContainer";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightColumn from "../../components/RightColumn/RightColumn";
import WebviewContainer from "../../containers/WebviewContainer/WebviewContainer";
import { hideContextMenu } from "../../containers/ContextMenuContainer/ContextMenuActions";
window.classNames = require('classnames');

require('./app.css');

class App extends React.Component {
  constructor(props) {
    super(props)

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(event) {
    IM.store.dispatch(hideContextMenu());
  }

  render() {
    return (
      <div className="app" onClick={this.onClickHandler}>
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