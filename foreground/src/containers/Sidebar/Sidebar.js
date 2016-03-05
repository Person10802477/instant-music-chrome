import React from "react";
import Chart from "../../components/Chart/Chart";

require("./sidebar.css");

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <div>Sidebar</div>
        <div className="playlist-selector">
          <Chart />
        </div>
      </div>
    );
  }
}

export default Sidebar;