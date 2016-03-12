import React from "react";
import ControlsContainer from '../../containers/ControlsContainer/ControlsContainer';

require("./right-column.css");

class RightColumn extends React.Component {
  render() {
    return (
      <div className="right-column">
        <div>
          <ControlsContainer />
        </div>
      </div>
    );
  }
}

export default RightColumn;
