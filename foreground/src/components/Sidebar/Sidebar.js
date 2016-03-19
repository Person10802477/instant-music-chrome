import React from "react";
import PlaylistContainer from "../../containers/PlaylistContainer/PlaylistContainer";

require("./sidebar.css");

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.onClickExpand = this.onClickExpand.bind(this);
  }

  onClickExpand(event) {
    if (chrome.runtime.id) {
      chrome.app.window.current().outerBounds.width = 901; 
    }
  }

  render() {
    return (
      <div className="sidebar">
        <PlaylistContainer />

        <i className="fa fa-chevron-right sidebar-expand"
          onClick={this.onClickExpand}
        ></i>
      </div>
    );
  }
}

export default Sidebar;
