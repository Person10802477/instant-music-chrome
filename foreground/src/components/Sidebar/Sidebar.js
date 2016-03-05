import React from "react";
import PlaylistContainer from "../../containers/PlaylistContainer/PlaylistContainer";

require("./sidebar.css");

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <PlaylistContainer />
      </div>
    );
  }
}

export default Sidebar;
