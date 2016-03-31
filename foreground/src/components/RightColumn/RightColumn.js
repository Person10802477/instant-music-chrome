import React from "react";
import ControlsContainer from '../../containers/ControlsContainer/ControlsContainer';
import SongDisplayContainer from '../../containers/SongDisplayContainer/SongDisplayContainer';
import AuxControls from '../../containers/AuxControlsContainer/AuxControlsContainer';

var API_URL = "http://localhost:3000/api/";

require("./right-column.css");

class RightColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="right-column">
        <div>
          <SongDisplayContainer />
          <ControlsContainer />
          <AuxControls />
        </div>
      </div>
    );
  }
}

export default RightColumn;
