import React from "react";
import ControlsContainer from '../../containers/ControlsContainer/ControlsContainer';
import SongDisplayContainer from '../../containers/SongDisplayContainer/SongDisplayContainer';

require("./right-column.css");

class RightColumn extends React.Component {
  render() {
    return (
      <div className="right-column">
        <div>
          <ControlsContainer />
          <SongDisplayContainer />
        </div>
      </div>
    );
  }
}

export default RightColumn;
