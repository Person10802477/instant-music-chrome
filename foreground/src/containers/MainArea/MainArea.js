import React from "react";
import Playlist from "../Playlist/Playlist"

require("./mainarea.css");

class MainArea extends React.Component {
  render() {
    return (
      <div className="main-area">
        <div>Main area</div>
        <Playlist />
      </div>
    );
  }
}

export default MainArea;
