import React from "react";
import ControlsContainer from '../../containers/ControlsContainer/ControlsContainer';
import SongDisplayContainer from '../../containers/SongDisplayContainer/SongDisplayContainer';
// import VolumeControlContainer from '../../containers/VolumeControlContainer/VolumeControlContainer';
import AuxControls from '../../containers/AuxControlsContainer/AuxControlsContainer';
import WebviewContainer from "../../containers/WebviewContainer/WebviewContainer";

require("./right-column.css");

class RightColumn extends React.Component {
  render() {
    return (
      <div className="right-column">
        <div>
          <WebviewContainer />
          <SongDisplayContainer />
          <ControlsContainer />
          <AuxControls />
        </div>
      </div>
    );
  }
}

export default RightColumn;
